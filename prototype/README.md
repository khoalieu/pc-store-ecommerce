# PCMatch buyer prototype

Frontend HTML/CSS/JavaScript thuần. Trang mua sắm là `buyer/home.html`; `index.html` chỉ là sitemap. Shop/Admin là các màn hình minh họa cũ, ngoài phạm vi hoàn thiện giao diện người mua.

## Chạy

Từ thư mục gốc repository:

```bash
python3 -m http.server 4173 -d prototype
```

Mở `http://127.0.0.1:4173/buyer/home.html`. Nếu Python bị ảnh hưởng bởi môi trường AppImage, dùng `env -u PYTHONHOME -u PYTHONPATH python3 -m http.server 4173 -d prototype`.

Không cần build hay cài package. Phải chạy qua localhost hoặc HTTPS để dùng JavaScript modules và Web Crypto; không mở bằng `file://`.

## Dữ liệu và các luồng đã có

- `assets/js/data.js`: model, shop và offer là các đối tượng riêng, ID nhất quán.
- `store.js`: dữ liệu localStorage `pcmatch-demo-v2`; phiên và bản nháp nằm trong sessionStorage. Lỗi ghi dữ liệu hoàn tác thay đổi và cho phép thử lại.
- `buyer.js`, `ui.js`: điều hướng, bản nháp theo đối tượng/tài khoản, xác nhận, thông báo, lỗi và trạng thái đang xử lý.
- `catalog.js`: Home mua sắm, tìm/lọc, so model, so offer và gian hàng.
- `account.js`: đăng ký/đăng nhập/khôi phục, hồ sơ, địa chỉ và thông báo.
- `commerce.js`: giỏ theo shop, checkout, mã demo, thanh toán, đơn con, giao nhận và hoàn tiền.
- `builds.js`: Builder, lưu/chia sẻ, tư vấn theo phiên bản, yêu cầu ngân sách và proposal.
- `support.js`: đánh giá, khiếu nại, hậu mãi và bằng chứng.

Khách xem/tìm/thêm giỏ được trước đăng nhập. Giỏ được giữ trên trình duyệt qua đăng nhập; đây là một giỏ demo dùng chung trên thiết bị, không đồng bộ hoặc ghép giỏ từ máy chủ. Form có bản nháp riêng theo URL đối tượng và tài khoản. Chỉ dùng thông tin thử nghiệm.

Tạo tài khoản từ màn đăng nhập. Công cụ demo ở footer có reset, hết hạn phiên và lỗi thao tác kế tiếp. Checkout có kịch bản đổi giá/bảo hành, hết hàng/ngừng bán và lỗi báo phí. Mã `PC100` do nền tảng tài trợ, `BP50` do BuildPro tài trợ; điều kiện và quy tắc không kết hợp được ghi ngay tại form. `EXPIRED` thử lỗi mã hết hạn.

## Kiểm thử bằng Chrome

Dùng **profile Chrome riêng**: các bài kiểm thử xóa dữ liệu demo trên origin đang kiểm thử.

```bash
google-chrome --headless=new --disable-gpu --remote-debugging-port=9229 --user-data-dir=/tmp/pcmatch-qa about:blank
node prototype/tests/cdp-runner.cjs prototype/tests/buyer-flows.js
node prototype/tests/cdp-runner.cjs prototype/tests/buyer-regressions.js
```

Cần Node có `fetch` và `WebSocket` toàn cục (Node 22+). Chạy hai suite lần lượt, không song song vì chúng dùng cùng tab. Suite đầu kiểm thử các luồng nền; suite hồi quy kiểm thử phần bổ sung, lỗi lưu/thử lại và 20 trang buyer ở 360/768/1440px. Ảnh QA được lưu dưới `/tmp/pcmatch-*.png`.

Đối chiếu chi tiết với tài liệu kiểm thử nằm trong `BUYER_AUDIT.md`.

## Giới hạn

Không có backend, xác thực/ủy quyền thật, kiểm tra giá/tồn đồng thời, thanh toán, email hoặc vận chuyển thật. Chia sẻ cấu hình chỉ hoạt động trong cùng kho trình duyệt. Tệp bằng chứng dùng dung lượng localStorage; lỗi dung lượng không tạo hồ sơ giả thành công. Chính sách hủy/hậu mãi và thời gian giao là giả định demo hiển thị rõ, không phải cam kết thương mại.

PDF, so sánh cấu hình tự lưu và trung tâm bài viết lớn thuộc P2 chưa chốt theo tài liệu; không bổ sung trong đợt này. Không COD, hàng cũ, AI sinh cấu hình hoặc benchmark/FPS giả.

Kiểm thử riêng hành trình khám phá sản phẩm (chạy lần lượt với các suite khác):

```bash
node prototype/tests/cdp-runner.cjs prototype/tests/discovery-flows.js
```

Các trang Search, Model, Shop, Compare sử dụng template HTML tại chính file trang; `catalog-data.js` truy vấn fixture và `catalog-view.js` gắn dữ liệu/ảnh vào template. Khi tích hợp backend, thay lớp đọc dữ liệu bằng API và tiếp tục kiểm tra quyền/giá/tồn ở máy chủ.

Kiểm thử mua hàng (Chrome CDP cổng 9229, máy chủ prototype cổng 4173):
`node prototype/tests/cdp-runner.cjs prototype/tests/purchase-flows.js`
Chạy từ gốc repository. Bộ kiểm thử xóa dữ liệu PCMatch trong profile Chrome kiểm thử; dùng profile riêng.

Kiểm thử hai dịch vụ build: `node prototype/tests/cdp-runner.cjs prototype/tests/build-flows.js`.
Bao gồm tư vấn riêng, yêu cầu ngân sách/proposal có phiên bản, chia sẻ chỉ đọc và giỏ một shop. Phản hồi shop được kích hoạt qua mục kịch bản demo.

Rà soát tài khoản và sau mua:
- `node prototype/tests/cdp-runner.cjs prototype/tests/aftersale-flows.js`
- `node prototype/tests/cdp-runner.cjs prototype/tests/sitemap-flows.js`
- Bảng truy vết đủ 45 mã: [BUYER_SITEMAP_AUDIT.md](BUYER_SITEMAP_AUDIT.md).

Dữ liệu làm việc (giỏ, checkout, Builder, so sánh) được lưu theo tài khoản demo. Đăng xuất chuyển sang không gian khách; đăng nhập khôi phục không gian cá nhân và ghép giỏ khách nếu có. Giỏ ghép vượt tồn được giữ để khách sửa tại checkout, không tự bỏ hàng. Quyền trong prototype chỉ là mô phỏng, không phải cơ chế bảo mật server.
Kiểm tra cuối sau `purchase-flows.js`: `node prototype/tests/cdp-runner.cjs prototype/tests/final-checks.js` (tìm sitemap, mốc giao nhận/hoàn hàng và làm tròn giảm giá khi hoàn theo serial).

Home mua sắm: hai banner tĩnh lấy cấu hình từ `assets/js/merchandising-data.js`; `createdAt` là ngày thêm model vào catalogue demo (không phải ngày hãng ra mắt), `soldCount` là số lượng bán minh họa cố định. Home và Search dùng cùng thứ tự bán chạy. Giá từ/số shop trên Home chỉ tính offer còn hàng của shop đang bán. Ảnh tái sử dụng trong `assets/images/products/`, nguồn tại `SOURCES.md`; các model chưa có ảnh riêng dùng hình danh mục.
Kiểm thử Home: `node prototype/tests/cdp-runner.cjs prototype/tests/home-flows.js`.

### Chat người mua
- Mở `buyer/chat.html` hoặc nút Chat nổi. Menu dùng chung có badge đếm **hội thoại** chưa đọc; mỗi dòng chat có số **tin** chưa đọc.
- Lịch sử nằm trong `pcmatch-demo-v2.chats`, khóa hội thoại theo `userId` + `shopId`. Hai lời chào mẫu được tạo riêng cho mỗi tài khoản. Bản nháp nằm trong sessionStorage theo tài khoản/shop; đăng nhập từ chat giữ shop, ngữ cảnh và nội dung nhưng không tự gửi.
- Model đính kèm snapshot tên/mã model, offer và giá. Đơn đính kèm ID cha/con; Builder đính kèm phiên bản và các slot, không thay thế form tư vấn. Có thể bỏ đính kèm trước khi gửi.
- Checkbox “Mô phỏng gửi lỗi” giữ bản nháp để thử lại. Sau khi gửi thành công, phản hồi mẫu có nhãn rõ; không có backend, WebSocket hoặc nhân viên trực. Reload trước khi bộ hẹn giờ trả lời chạy có thể không sinh phản hồi mẫu; tin đã lưu vẫn còn.
- Công cụ demo → Reset toàn bộ demo xóa cả lịch sử và nháp chat. Bubble ẩn trên trang thanh toán, khi có modal khác; tự dịch lên nếu chồng lên CTA chính; tab Chat vẫn truy cập được.
- Kiểm thử: `node prototype/tests/cdp-runner.cjs prototype/tests/chat-flows.js` (server 4173, Chrome CDP 9229, dùng profile kiểm thử riêng). Có kiểm tra 360/768/1440px, viewport thấp mô phỏng bàn phím, Esc/focus, trạng thái gửi/lỗi, lưu trữ và phân tách tài khoản.
