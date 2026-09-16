# PCMATCH — ĐẶC TẢ YÊU CẦU GIAO DIỆN HTML/CSS

> Tài liệu đầu vào dành cho AI thiết kế giao diện • Phiên bản 1.1 • 16/09/2026  
> Trạng thái: Chốt phạm vi prototype tĩnh, kiến trúc thông tin và nguyên tắc triển khai; chưa có nghiệp vụ/backend

---

## 0. Chỉ dẫn bắt buộc cho AI thực hiện giai đoạn thiết kế

Hãy đọc toàn bộ tài liệu này trước khi tạo mã. Không được tự ý bỏ màn hình, gộp mất thao tác, thay đổi vai trò hoặc bổ sung nghiệp vụ trái với phần “Phạm vi đã chốt”.

Mục tiêu giai đoạn kế tiếp là tạo **prototype giao diện responsive bằng HTML5 và CSS3** để trực quan hóa toàn bộ sản phẩm, kiểm tra kiến trúc thông tin, luồng chính, hệ thống thiết kế và cấu trúc màn hình trước khi xây dựng nghiệp vụ. Chỉ được dùng một lượng rất nhỏ JavaScript thuần cho tương tác xem trước như đóng/mở sidebar hoặc drawer, chuyển tab, dropdown, accordion và modal. Không kết nối cơ sở dữ liệu, API, xác thực, thanh toán hoặc đơn vị vận chuyển thật; không viết logic nghiệp vụ production.

### 0.1. Hợp đồng triển khai giai đoạn prototype

- **Stack:** HTML5 + CSS3 tĩnh; vanilla JavaScript không phụ thuộc, chỉ phục vụ preview interaction.
- **Quy trình:** code-first. Không tạo visual comp bằng ảnh trước khi code; tham vọng thị giác phải được ghi rõ trong direction contract và kiểm tra trên bản render.
- **Thứ tự bắt buộc:** chốt `PRODUCT.md` → kiến trúc thông tin và luồng chính → hướng thị giác → token và pattern dùng lại → `DESIGN.md` → triển khai màn hình → kiểm tra desktop/mobile.
- **Dữ liệu:** tất cả là dữ liệu minh họa nhưng phải liên tục và nhất quán giữa Buyer, Shop và Admin.
- **Tương tác:** nút và liên kết phải dẫn tới trang, anchor, modal hoặc trạng thái mẫu có thật; không dùng nút trang trí không có đích.
- **Biên giới prototype:** phân quyền, thay đổi trạng thái, kiểm tra tương thích, tính giá, giữ tồn, thanh toán, webhook và đối soát chỉ được **mô phỏng bằng UI**.

Nguyên tắc bàn giao:

1. Không coi “đã có nút” là đã phủ chức năng; phải có cả màn hình đích và trạng thái liên quan.
2. Không dùng dữ liệu lorem ipsum. Dùng dữ liệu mẫu linh kiện PC bằng tiếng Việt, giá VND và trạng thái sát nghiệp vụ.
3. Tách rõ giao diện công khai/Người mua, Cổng Shop và Cổng Quản trị.
4. Ẩn/hiện theo vai trò chỉ là biểu diễn UI; tài liệu vẫn yêu cầu backend kiểm tra quyền ở giai đoạn hiện thực.
5. Mỗi bảng quản lý phải có: tìm kiếm, lọc, sắp xếp khi phù hợp, phân trang, trạng thái rỗng, lỗi, tải dữ liệu và hành động theo quyền.
6. Mỗi form phải có: nhãn, gợi ý định dạng, trường bắt buộc, lỗi tại trường, lỗi tổng quát, trạng thái đang gửi, thành công và hủy/quay lại.
7. Mọi hành động nhạy cảm phải có hộp xác nhận, lý do khi cần và thông báo kết quả.
8. Giao diện phải responsive cho desktop, tablet và mobile; không chỉ thu nhỏ bản desktop.

---

## 1. Tên dự án và định vị

### 1.1. Tên được chọn

- **Tên thương hiệu:** PCMatch
- **Tên đầy đủ:** PCMatch — Sàn linh kiện và kết nối cấu hình PC đa cửa hàng
- **Tagline:** **Khớp cấu hình. Đúng ngân sách. Chọn shop minh bạch.**
- **Tên kỹ thuật gợi ý:** `pcmatch-marketplace`

Tên “PCMatch” thể hiện ba giá trị cốt lõi: khớp linh kiện tương thích, khớp nhu cầu với ngân sách và khớp người mua với đề xuất của nhiều shop. Trước khi dùng thương mại cần kiểm tra nhãn hiệu và tên miền; điều này không ảnh hưởng prototype đồ án.

### 1.2. Mô hình sản phẩm

PCMatch là sàn thương mại điện tử B2C đa cửa hàng dành cho linh kiện máy tính mới tại Việt Nam. Nền tảng không tự nhập hàng. Shop đăng tin bán dựa trên model kỹ thuật chuẩn; người mua có thể:

- Tìm, lọc và so sánh linh kiện/tin bán.
- Tự xây cấu hình PC và kiểm tra tương thích.
- Đăng nhu cầu theo ngân sách để nhiều shop gửi cấu hình và báo giá.
- Mua từ một hoặc nhiều shop trong một lượt đặt hàng.
- Theo dõi giao hàng, đổi trả, bảo hành, khiếu nại và đánh giá.

Điểm khác biệt phải được ưu tiên thị giác trên trang chủ: **“Tự build PC”** và **“Nhận đề xuất theo ngân sách”** là hai lối vào ngang cấp.

---

## 2. Nguồn yêu cầu và nguyên tắc ưu tiên

Tài liệu này đã tổng hợp 12 tài liệu Word và 1 sơ đồ Use Case trong gói phân tích dự án, đặc biệt gồm: Phân Tích Chi Tiết Đề Tài v1.2; Chức năng Người mua; Phân tích Actor Chủ shop; Tổng hợp chức năng; Actor Đơn vị vận chuyển; URS; sơ đồ Use Case; phân tích tệp khách hàng; phân tích đối thủ.

Khi các nguồn mâu thuẫn, áp dụng thứ tự:

1. Quyết định phạm vi trong **Phân Tích Chi Tiết Đề Tài v1.2**.
2. Tài liệu actor chi tiết mới hơn và sơ đồ Use Case ngày 14/09/2026.
3. Tổng hợp chức năng và URS cũ hơn chỉ dùng để bổ sung chi tiết không xung đột.

### 2.1. Phạm vi đã chốt cho prototype

- Giao dịch B2C, hàng mới, VND, giao trong Việt Nam.
- Một kho chính cho mỗi shop trong MVP.
- Tám nhóm linh kiện: CPU, Mainboard, RAM, GPU, SSD, PSU/Nguồn, Case/Vỏ, Tản nhiệt.
- Thanh toán trực tuyến ở chế độ mô phỏng/thử nghiệm; không xây ví điện tử.
- Một lượt mua có một đơn cha và nhiều đơn con theo shop.
- Một kiện vận chuyển cho mỗi đơn con trong MVP.
- Lắp ráp chỉ khi một shop bán trọn bộ và có dịch vụ lắp ráp.
- “Chuyên gia tư vấn” là Chủ shop/Nhân viên shop có quyền; không phải actor AI độc lập.
- Một đề xuất build theo ngân sách phải dùng các tin bán của chính shop gửi đề xuất.

### 2.2. Hạng mục vẫn phải ghi nhận nhưng đặt nhãn “Mở rộng”

- COD, trả góp, nhiều kho, nhiều kiện cho một đơn con.
- Hàng cũ/C2C, đấu giá, gom hàng nhiều shop để lắp ráp trọn bộ.
- Ví shop và yêu cầu rút tiền; MVP dùng tài khoản nhận tiền và bảng đối soát.
- AI tự sinh cấu hình, tự tạo thông số hoặc dự đoán FPS không có nguồn.
- Đồng bộ kho tự động, quảng cáo tự phục vụ, giao hẹn giờ, điểm nhận hàng.
- Chat tổng quát giữa mọi người dùng. MVP chỉ có trao đổi theo ngữ cảnh tư vấn, proposal, hỏi đáp và vụ việc.

Không được xóa các mục mở rộng khỏi tài liệu thiết kế; có thể thể hiện trong trang “Lộ trình/Tính năng sắp tới”, nhưng không đặt chúng như hành động khả dụng trong luồng MVP.

---

## 3. Vai trò và phạm vi quyền

| Mã | Vai trò | Không gian giao diện | Quyền chính | Giới hạn bắt buộc thể hiện |
|---|---|---|---|---|
| R01 | Khách/Người mua | Website công khai + Tài khoản cá nhân | Tra cứu, build PC, yêu cầu báo giá, mua hàng, hậu mãi | Chỉ dữ liệu cá nhân/đơn của mình; chức năng giao dịch cần đăng nhập |
| R02 | Chủ shop | Cổng Shop | Hồ sơ, nhân viên, offer, kho, proposal, đơn, hậu mãi, tài chính | Chỉ shop của mình; không sửa model chuẩn |
| R03 | Nhân viên shop | Cổng Shop theo quyền | Offer, kho, proposal, đơn, hậu mãi, phản hồi | Không mặc định xem tài khoản nhận tiền/tài chính; quyền có thể bị thu hồi |
| R04 | Quản trị danh mục | Cổng Quản trị | Danh mục, hãng, model, thông số, nguồn, rule tương thích | Không tự xử lý tiền/tranh chấp ngoài quyền |
| R05 | Hỗ trợ & kiểm duyệt | Cổng Quản trị | Báo cáo, tin bán, đánh giá, hỏi đáp, đơn/hậu mãi, tranh chấp | Không tùy ý sửa tiền; chỉ xem dữ liệu cần cho vụ việc |
| R06 | Quản trị nền tảng | Cổng Quản trị | Tài khoản, shop, phí, khuyến mãi, vận hành, tài chính, báo cáo | Điều chỉnh nhạy cảm phải có lý do và nhật ký |
| R07 | Cổng thanh toán | Tích hợp ngoài/mô phỏng | Trả kết quả thu/hoàn tiền | Không dùng trang redirect làm bằng chứng duy nhất |
| R08 | Đơn vị vận chuyển | Tích hợp ngoài/API/webhook | Báo phí, vận đơn, hành trình, giao/hoàn | Không đăng nhập marketplace; không sửa đơn, tiền, tồn hoặc bảo hành |

### 3.1. Quyền chưa đăng nhập

Được xem trang chủ, tìm kiếm, danh mục, model, shop, đánh giá/hỏi đáp, so sánh offer, so sánh linh kiện và xây cấu hình tạm. Khi lưu cấu hình, gửi tư vấn, gửi câu hỏi/báo cáo, thêm dữ liệu cá nhân, đặt hàng hoặc hậu mãi, giao diện phải yêu cầu đăng nhập và giữ ngữ cảnh đang thao tác.

---

## 4. Kiến trúc thông tin tổng thể

### 4.1. Website công khai/Người mua

Header desktop gồm logo, thanh tìm kiếm, menu Danh mục, Build PC, Build theo ngân sách, So sánh, Theo dõi đơn, icon thông báo, giỏ hàng và tài khoản. Mobile dùng header gọn và bottom navigation: Trang chủ, Danh mục, Build, Đơn hàng, Tài khoản.

Footer gồm giới thiệu, hướng dẫn mua, hướng dẫn mở shop, chính sách, hỗ trợ, liên hệ, phương thức thanh toán/giao nhận ở dạng minh họa và cảnh báo đây là hệ thống đồ án nếu cần.

### 4.2. Cổng Shop

Layout desktop: sidebar trái, topbar có chọn shop (nếu một tài khoản có quan hệ nhiều shop về sau), tìm kiếm nhanh, thông báo, tài khoản. Nhóm menu: Tổng quan; Gian hàng; Nhân viên; Model & Tin bán; Kho; Yêu cầu Build; Tư vấn kỹ thuật; Đơn hàng; Vận chuyển; Hậu mãi; Hỏi đáp & Đánh giá; Tài chính; Báo cáo; Cài đặt.

Mobile: sidebar thành drawer; bảng chuyển sang thẻ, giữ bộ lọc và hành động chính.

### 4.3. Cổng Quản trị

Layout dashboard mật độ cao, sidebar theo quyền: Tổng quan; Tài khoản & Quyền; Shop; Danh mục; Model & Nguồn; Quy tắc tương thích; Tin bán; Nội dung; Vụ việc; Đơn & Thanh toán; Hoàn tiền; Đối soát; Khuyến mãi; Tài trợ; Vận chuyển; Chính sách; Báo cáo; Nhật ký.

Không hiển thị menu tài chính cho tài khoản chỉ có quyền kiểm duyệt. Mỗi trang quản trị cần breadcrumb, tiêu đề, mô tả ngắn, hành động chính và vùng bộ lọc.

### 4.4. Sơ đồ kiến trúc thông tin

```text
PCMatch
├── Công khai & Người mua
│   ├── Khám phá: Trang chủ → Tìm kiếm/Danh mục → Model → So sánh offer → Shop
│   ├── Tự build: PC Builder → Chọn linh kiện → Kiểm tra → Lưu/Chia sẻ/Tư vấn
│   ├── Theo ngân sách: Yêu cầu → Proposal → So sánh → Chọn → Giỏ
│   ├── Giao dịch: Giỏ → Checkout → Thanh toán mô phỏng → Kết quả
│   └── Sau mua: Đơn → Vận chuyển → Đánh giá/Hậu mãi/Khiếu nại
├── Cổng Shop
│   ├── Thiết lập: Mở shop → Duyệt → Hồ sơ → Nhân viên
│   ├── Bán hàng: Model chuẩn → Offer → Kho
│   ├── Cấu hình: Yêu cầu Build → Proposal → Tư vấn
│   ├── Thực hiện: Đơn con → Serial/Đóng gói → Vận đơn
│   └── Vận hành: Hậu mãi → Nội dung → Tài chính → Báo cáo
└── Cổng Quản trị
    ├── Nền tảng: Tài khoản/Quyền → Shop → Chính sách
    ├── Dữ liệu kỹ thuật: Danh mục → Model/Nguồn → Rule → Phòng kiểm thử
    ├── Tin cậy: Kiểm duyệt → Vụ việc → Hỗ trợ
    ├── Tiền: Giao dịch → Hoàn tiền → Đối soát
    └── Vận hành: Vận chuyển → Báo cáo → Nhật ký
```

### 4.5. Nguyên tắc route và điều hướng

- Mỗi không gian có shell riêng nhưng dùng chung token, component grammar và từ điển trạng thái.
- Buyer ưu tiên task entry; Shop ưu tiên queue và SLA; Admin ưu tiên exception, evidence và audit.
- Các thực thể có mã (`Build ID`, mã đơn cha/con, tracking, RMA, case, settlement) phải là anchor điều hướng nhất quán.
- Breadcrumb cho biết ngữ cảnh; tab phân chia các góc nhìn của cùng thực thể; không dùng tab để giả làm route khác nghiệp vụ.
- Sitemap prototype là cửa vào kiểm thử, liên kết tới toàn bộ ID màn hình và các trang đại diện có responsive/state coverage.

### 4.6. Luồng người dùng chính cần nối được trong prototype

1. **Tự build và mua:** B01 → B14 → B15 → B14 → B28 → B29 → B32/B33 → B34 → B36.
2. **Nhận cấu hình theo ngân sách:** B01 → B22 → B23 → S12/S13 → S14/S15 → B24/B25 → B27 → B28/B29.
3. **Nghiên cứu và so sánh:** B02/B03 → B04 → B05/B06 → B07 → B14 hoặc B28.
4. **Shop từ mở gian hàng đến thực hiện đơn:** S02 → S03/A04 → S04 → S07 → S10 → S11 → S17 → S18 → S19 → S20.
5. **Hậu mã và tài chính:** B40/B41 → S22/S23 hoặc S24 → A15/A22 → S27/S28 → A23/A24.
6. **Quản trị dữ liệu tương thích:** A07/A08 → A09 → A10 → A11 → B14/B04.

Mỗi luồng phải có điểm vào, bước quyết định, trạng thái bị chặn/lỗi, xác nhận hành động và điểm kết thúc có bước tiếp theo rõ ràng.

---

## 5. Danh mục màn hình Website công khai và Người mua

Ký hiệu ưu tiên: **P0** bắt buộc để chạy luồng chính; **P1** bắt buộc để phủ đầy đủ nghiệp vụ; **P2** tiện ích/biến thể cần có trong prototype hoàn chỉnh.

### 5.1. Khám phá và tài khoản

| ID | Màn hình/route gợi ý | Nội dung, bố cục và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| B01 | Trang chủ `/` | Hero có 2 CTA “Tự build PC” và “Nhận cấu hình theo ngân sách”; tìm kiếm; 8 danh mục; cấu hình mẫu; deal/offer; shop nổi bật; khu vực tài trợ có nhãn; hướng dẫn 3 bước; lợi ích bảo hành/serial | P0 |
| B02 | Tìm kiếm `/tim-kiem` | Ô từ khóa, breadcrumb, số kết quả; bộ lọc theo danh mục/thương hiệu/giá/thông số/shop/còn hàng; sort; grid/list; pagination; chip bộ lọc; empty/no-result | P0 |
| B03 | Danh mục `/linh-kien/{slug}` | Banner danh mục, bộ lọc kỹ thuật thay đổi theo loại, model card, so sánh đã chọn, nội dung hướng dẫn | P0 |
| B04 | Chi tiết model `/model/{id}` | Gallery; tên/hãng/mã/biến thể; thông số chuẩn và nguồn; bốn trạng thái dữ liệu; danh sách offer theo shop; giá/phí giao/ETA/tồn/bảo hành/đánh giá; CTA thêm PC/giỏ/so sánh; hỏi đáp; sản phẩm liên quan | P0 |
| B05 | So sánh offer cùng model `/model/{id}/so-sanh-shop` | Bảng cố định cột tiêu chí: shop, xác minh, giá, phí giao, tổng, tồn, cập nhật, ETA, bảo hành, điểm/số đánh giá; chọn địa chỉ/khu vực; không tự gắn “tốt nhất” chỉ vì rẻ | P0 |
| B06 | So sánh linh kiện `/so-sanh-linh-kien` | Chọn 2–4 model cùng loại; nhóm khác biệt thông số, giá từ, nguồn; tô khác biệt có nhãn văn bản; nút thêm vào PC | P1 |
| B07 | Gian hàng công khai `/shop/{slug}` | Logo/xác minh/điểm; giới thiệu, chính sách, thời gian hoạt động; bộ lọc offer; đánh giá shop; hỏi đáp; không lộ hồ sơ xác minh nhạy cảm | P1 |
| B08 | Đăng ký `/dang-ky` | Họ tên, email, mật khẩu, xác nhận, điều khoản; lỗi email trùng/mật khẩu; trạng thái thành công | P0 |
| B09 | Đăng nhập `/dang-nhap` | Email, mật khẩu, nhớ phiên tùy chọn, quên mật khẩu, chuyển đăng ký; lỗi sai/khóa tài khoản; giữ URL quay lại | P0 |
| B10 | Khôi phục mật khẩu `/quen-mat-khau` | Nhập email → trạng thái đã gửi mã/liên kết → xác minh → mật khẩu mới → hết hạn/sai mã/thành công | P1 |
| B11 | Trung tâm tài khoản `/tai-khoan` | Sidebar/tab Hồ sơ, Bảo mật, Địa chỉ, Thông báo; cập nhật hồ sơ; đổi mật khẩu; trạng thái xác minh email | P1 |
| B12 | Địa chỉ `/tai-khoan/dia-chi` | Danh sách thẻ địa chỉ; thêm/sửa/xóa/đặt mặc định; modal form; cảnh báo sửa địa chỉ không đổi đơn cũ | P1 |
| B13 | Trung tâm thông báo `/thong-bao` | Nhóm đơn hàng, build/proposal, hậu mãi, hệ thống; chưa đọc/đã đọc; liên kết về đúng đối tượng; empty state | P1 |

### 5.2. PC Builder, cấu hình lưu và tư vấn chuyên gia

| ID | Màn hình/route gợi ý | Nội dung, bố cục và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| B14 | PC Builder `/build-pc` | Danh sách 8 slot linh kiện; trạng thái trống/đã chọn; panel tổng giá; chi phí chưa gồm; bốn mức tương thích; lỗi theo cặp và cách sửa; CTA chọn/đổi/xóa/làm mới/lưu/chia sẻ/xuất PDF/thêm giỏ/gửi tư vấn | P0 |
| B15 | Chọn linh kiện cho slot `/build-pc/chon/{category}` | Drawer/page có tìm, lọc kỹ thuật, sort, shop/giá/tồn; nhãn tương thích với cấu hình hiện tại; chọn model + offer; gợi ý thay thế tương thích, gồm fallback khi hết hàng | P0 |
| B16 | So sánh cấu hình `/build-pc/so-sanh` | So 2 cấu hình: danh sách linh kiện, tổng giá, trạng thái tương thích, công suất ước tính có nguồn/phạm vi, các khác biệt; không tuyên bố FPS thiếu bằng chứng | P1 |
| B17 | Cấu hình đã lưu `/tai-khoan/cau-hinh` | Grid/list cấu hình; tên, Build ID, quyền chia sẻ, cập nhật, giá tham khảo, cảnh báo thay đổi; mở/sửa/nhân bản/xóa/chia sẻ/xuất PDF | P1 |
| B18 | Chi tiết cấu hình chia sẻ `/build/{build-id}` | Cấu hình công khai/riêng tư; chủ sở hữu ẩn dữ liệu nhạy cảm; thông số, kiểm tra, giá cập nhật; nút sao chép vào tài khoản | P1 |
| B19 | Tạo yêu cầu tư vấn `/tu-van/tao` | Chọn cấu hình/version; chọn một shop có dịch vụ; nhu cầu, ngân sách, câu hỏi, linh kiện giữ lại; xác nhận dữ liệu chia sẻ; gửi | P1 |
| B20 | Chi tiết tư vấn `/tu-van/{id}` | Timeline trao đổi theo ngữ cảnh; cấu hình đã gửi cố định theo phiên bản; phản hồi shop; phương án thay thế và chênh lệch; chấp nhận/từ chối từng thay đổi; gửi bổ sung; trạng thái chờ/đang tư vấn/hoàn tất/hủy | P1 |

### 5.3. Build PC theo ngân sách và proposal

| ID | Màn hình/route gợi ý | Nội dung, bố cục và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| B21 | Danh sách yêu cầu `/yeu-cau-build` | Thẻ theo trạng thái nháp/đang nhận/hết hạn/đã đóng/đã hủy/đã chọn; số proposal; hạn; tạo mới, xem, sửa, gia hạn, đóng/hủy | P0 |
| B22 | Tạo/sửa yêu cầu `/yeu-cau-build/tao` | Wizard: mục đích → ngân sách → linh kiện đang có → màn hình/phụ kiện → lắp ráp → khu vực → hạn; giải thích ngân sách gồm khoản nào; xem trước; lưu nháp/công khai | P0 |
| B23 | Chi tiết yêu cầu `/yeu-cau-build/{id}` | Tóm tắt yêu cầu và version; trạng thái/hạn; proposal nhận được; timeline thay đổi; hành động sửa/gia hạn/đóng/hủy; cảnh báo sửa tạo version mới | P0 |
| B24 | Chi tiết proposal `/proposal/{id}` | Shop, version, hạn; từng model/offer/số lượng/giá; phí giao/lắp/ưu đãi/tổng; lệch ngân sách; bảo hành/ETA; kết quả tương thích; lý do chọn; lịch sử version; yêu cầu sửa/chọn | P0 |
| B25 | So sánh proposal `/yeu-cau-build/{id}/so-sanh` | Chọn 2–4 proposal; so theo từng vị trí linh kiện, tổng phí, chênh ngân sách, tương thích, bảo hành, dịch vụ, ETA, uy tín; không chỉ so tổng tiền; CTA xem/yêu cầu sửa/chọn | P0 |
| B26 | Yêu cầu chỉnh sửa proposal | Modal/page nhập nội dung, linh kiện mong đổi, mục tiêu chi phí; không sửa trực tiếp proposal; timeline phản hồi; trạng thái đã gửi/shop phản hồi | P1 |
| B27 | Xác nhận chọn proposal | Tóm tắt version; kiểm tra lại giá/tồn/phí/tương thích; cảnh báo hết hạn/thay đổi/vượt ngân sách; checkbox đồng ý tăng ngân sách nếu có; tuyên bố rõ “chưa giữ hàng/chưa tạo đơn”; đưa vào giỏ | P0 |

### 5.4. Giỏ hàng, checkout và thanh toán

| ID | Màn hình/route gợi ý | Nội dung, bố cục và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| B28 | Giỏ hàng `/gio-hang` | Nhóm item theo shop; chọn toàn bộ/theo shop; số lượng/xóa/lưu sau; giá cũ-mới; tồn/ngừng bán; subtotal theo shop và tổng; nhãn mua lẻ/cấu hình; cảnh báo giỏ không giữ tồn | P0 |
| B29 | Checkout `/thanh-toan` | Địa chỉ; mỗi shop là một khối với item, phương thức giao, phí/ETA, dịch vụ lắp nếu đủ điều kiện; voucher shop/sàn; phương thức thanh toán online mô phỏng; hóa đơn tóm tắt; đồng ý điều khoản | P0 |
| B30 | Chọn vận chuyển | Modal/section báo phí riêng từng shop; dịch vụ, phí, ETA, thời hạn báo giá; không có báo phí/lỗi vùng phục vụ/thử lại/đổi địa chỉ; tính lại khi dữ liệu đổi | P0 |
| B31 | Áp dụng mã giảm giá | Drawer/modal danh sách mã đủ/không đủ điều kiện, bên tài trợ, số giảm, điều kiện, loại trừ; phản hồi mã sai/hết hạn; hiển thị phân bổ giảm giá | P1 |
| B32 | Kiểm tra thay đổi trước đặt | Trang/modal diff giá, tồn, phí, bảo hành; chấp nhận từng thay đổi hoặc quay lại giỏ; không tự thay model; một món lỗi thì không âm thầm đặt phần còn lại | P0 |
| B33 | Thanh toán mô phỏng `/thanh-toan/{order}` | Số tiền/mã tham chiếu/thời hạn; phương thức mô phỏng; trạng thái đang xử lý/thành công/thất bại/hết hạn; thử lại; cảnh báo không đóng trang khi xử lý | P0 |
| B34 | Kết quả đặt hàng | Mã đơn cha; danh sách đơn con; thanh toán; địa chỉ snapshot; hướng dẫn theo dõi; biến thể thành công/một phần chờ xử lý/thất bại | P0 |

### 5.5. Đơn hàng, vận chuyển và hậu mãi

| ID | Màn hình/route gợi ý | Nội dung, bố cục và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| B35 | Lịch sử đơn `/tai-khoan/don-hang` | Tìm theo mã; lọc thời gian/trạng thái/shop; card đơn cha chứa các đơn con; trạng thái thanh toán và giao riêng; CTA xem/mua lại/hủy/đánh giá/hậu mãi theo điều kiện | P0 |
| B36 | Chi tiết đơn `/tai-khoan/don-hang/{id}` | Tổng quan đơn cha; tab đơn con; item, snapshot giá/chính sách/serial; timeline đơn; payment/refund; shipment; hóa đơn; hành động được phép; cảnh báo giao/hủy một phần | P0 |
| B37 | Theo dõi vận chuyển `/van-don/{id}` | Carrier/service/tracking; ETA; timeline trạng thái chuẩn + chi tiết; bằng chứng theo quyền; giao thất bại với lý do và hướng xử lý; đang hoàn/đã hoàn | P0 |
| B38 | Yêu cầu hủy đơn | Chọn đơn con/dòng đủ điều kiện, lý do, ảnh hưởng cấu hình, số tiền dự kiến hoàn; trạng thái gửi/duyệt/từ chối/đã hủy/đang hoàn tiền | P1 |
| B39 | Trung tâm bảo hành theo Build ID `/bao-hanh` | Tìm Build ID/đơn/serial; nhóm linh kiện theo cấu hình; shop chịu trách nhiệm, thời hạn/chính sách; tạo RMA từng item; không gộp trách nhiệm nhiều shop | P1 |
| B40 | Tạo hồ sơ đổi/trả/bảo hành `/hau-mai/tao` | Chọn loại riêng biệt; đơn/item/serial/số lượng; lý do, mô tả, ảnh/video; phương thức gửi hàng; chính sách lúc mua; ngăn hồ sơ trùng/quá số lượng | P0 |
| B41 | Chi tiết hồ sơ hậu mãi `/hau-mai/{id}` | Trạng thái/timeline; bằng chứng hai bên; yêu cầu bổ sung; hướng dẫn gửi; kết quả kiểm tra; sửa/đổi/serial mới/đề nghị hoàn/từ chối; payment refund tách riêng | P0 |
| B42 | Khiếu nại/tranh chấp/báo cáo `/ho-tro/tao` | Phân biệt báo cáo nội dung với khiếu nại đơn; chọn đối tượng/lý do/bằng chứng; quyền xem riêng tư; mã vụ việc; đề nghị xem xét lại | P1 |
| B43 | Chi tiết vụ việc `/ho-tro/{id}` | Timeline, người/bộ phận xử lý ở mức phù hợp, bằng chứng, quyết định/lý do, tác vụ tài chính liên quan, trạng thái mở/đang xử lý/chờ/đóng/mở lại | P1 |
| B44 | Viết/sửa đánh giá | Chỉ item đã giao; điểm model và điểm dịch vụ shop tách riêng; nội dung/ảnh; nhãn đã mua; lịch sử sửa; báo cáo phản hồi vi phạm | P1 |
| B45 | Hỏi đáp trước mua | Danh sách câu hỏi tại model/offer; tìm/lọc; gửi câu hỏi sau đăng nhập; câu trả lời shop; báo cáo nội dung; không lẫn đánh giá sau mua | P1 |

---

## 6. Danh mục màn hình Cổng Shop

### 6.1. Gian hàng, nhân sự, model, offer và kho

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| S01 | Dashboard Shop | KPI đơn mới/doanh số/tồn thấp/proposal chờ/RMA; việc cần làm; cảnh báo shop; biểu đồ ngắn; quick actions | P0 |
| S02 | Đăng ký mở shop | Wizard thông tin shop, logo, MST/CCCD/giấy phép, liên hệ, kho, tài liệu; lưu nháp/gửi duyệt; định dạng/dung lượng; lý do từ chối/bổ sung | P0 |
| S03 | Trạng thái xét duyệt | Bản nháp/chờ duyệt/cần bổ sung/hoạt động/tạm ngừng/đóng; timeline; yêu cầu bổ sung; gửi lại; giới hạn theo trạng thái | P1 |
| S04 | Hồ sơ gian hàng | Thông tin công khai, giờ hoạt động, liên hệ, một địa chỉ kho; xem trước trang shop; cảnh báo snapshot đơn cũ | P0 |
| S05 | Tài khoản nhận tiền | Ngân hàng/số tài khoản/chủ tài khoản dạng che; thêm/sửa; xác thực lại bằng mật khẩu/mã mô phỏng; lịch sử thay đổi; chỉ Chủ shop | P1 |
| S06 | Nhân viên & phân quyền | Danh sách/mời email/kích hoạt/khóa; role template + quyền chi tiết cho offer, kho, proposal, đơn, hậu mãi, tài chính, báo cáo; thu hồi quyền; audit | P0 |
| S07 | Tra cứu model chuẩn | Tìm hãng/mã/biến thể; xem thông số/nguồn/trạng thái; chọn tạo offer; nếu chưa có thì gửi yêu cầu model | P0 |
| S08 | Yêu cầu model mới | Form hãng/mã/biến thể/thông số/nguồn/tài liệu; kiểm tra model gần giống; danh sách yêu cầu; trạng thái chờ/bổ sung/duyệt/từ chối | P1 |
| S09 | Danh sách tin bán | Tìm/lọc model/trạng thái/tồn; giá/tồn/cập nhật; tạo/sửa/ẩn/hiện; bulk action có kiểm soát; cảnh báo tin trùng/vi phạm | P0 |
| S10 | Tạo/sửa tin bán | Chọn model chuẩn; ảnh, giá, tồn, phụ kiện, tình trạng “Mới”, bảo hành; xem trước; lịch sử; lỗi giá/tồn; không cho sửa model chuẩn | P0 |
| S11 | Quản lý kho | Tồn thực tế/đang giữ/khả dụng; nhập điều chỉnh và lý do; lịch sử; cảnh báo tồn thấp; chặn thấp hơn reserved; xung đột phiên bản | P0 |

### 6.2. Build request, proposal và tư vấn

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| S12 | Danh sách yêu cầu Build | Lọc ngân sách/khu vực/mục đích/hạn; chỉ yêu cầu đang nhận; không lộ tên/SĐT/địa chỉ chi tiết; trạng thái đã xem/đã đề xuất | P0 |
| S13 | Chi tiết yêu cầu Build | Nhu cầu, ngân sách/phạm vi, linh kiện giữ lại, khu vực, hạn, version; kiểm tra shop đủ điều kiện; CTA tạo proposal | P0 |
| S14 | Trình tạo proposal | 8 slot; chỉ offer của shop; tồn; kiểm tra tương thích; lý do chọn; bảo hành; phí giao/lắp; ưu đãi; hạn; tổng/chênh ngân sách; chặn xung đột xác định | P0 |
| S15 | Danh sách/chi tiết proposal | Nháp/đã gửi/cần xác nhận lại/đã chọn/bị từ chối/đã rút/hết hạn; lịch sử version; sửa thành bản mới/rút; phản hồi chỉnh sửa; không giữ tồn lúc gửi | P0 |
| S16 | Hàng chờ tư vấn kỹ thuật | Yêu cầu đích danh shop; cấu hình và version; câu hỏi; gửi nhận xét, linh kiện thay thế, chênh lệch; lịch sử trao đổi; hoàn tất/từ chối | P1 |

### 6.3. Đơn hàng, vận chuyển, hậu mãi và nội dung

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| S17 | Danh sách đơn con | Tab chờ xác nhận/chuẩn bị/chờ lấy/đang giao/hoàn tất/hủy; tìm/lọc; SLA; chỉ đơn shop; export/in phiếu ở mức UI | P0 |
| S18 | Chi tiết/xác nhận đơn | Item, snapshot, địa chỉ cần thiết, payment verified, ghi chú; xác nhận/từ chối lý do; không thấy đơn shop khác | P0 |
| S19 | Đóng gói & Serial | Nhập/quét serial từng item, ảnh đóng gói, trọng lượng/kích thước/số kiện, kiểm tra đủ; phiếu giao/nhãn vận chuyển; trạng thái lắp ráp/test nếu áp dụng | P0 |
| S20 | Tạo/quản lý vận đơn | Chọn dịch vụ; tạo idempotent; tracking/label/lịch lấy; lỗi địa chỉ/timeout; hủy trước lấy; đặt lại lịch; timeline webhook; không chuyển “đang giao” trước khi xác nhận lấy | P0 |
| S21 | Từ chối/hủy đơn con | Lý do, ảnh hưởng chỉ số, cảnh báo hoàn tiền/cấu hình thiếu món; chỉ trước điều kiện cho phép; trạng thái xử lý | P1 |
| S22 | Danh sách hậu mãi | Bộ lọc trả/đổi/bảo hành; thời hạn; SLA; item/serial; trạng thái; phân nhân viên theo quyền | P0 |
| S23 | Xử lý trả/hoàn | Bằng chứng; đồng ý/từ chối lý do; hướng dẫn gửi; xác nhận nhận hàng/tình trạng; đề nghị số tiền hoàn; không tự đánh dấu tiền đã hoàn | P0 |
| S24 | Xử lý bảo hành | Kiểm tra serial/thời hạn; nhận hàng; trạng thái kiểm tra/sửa/đổi/từ chối; serial thay thế; gửi trả; lịch sử | P0 |
| S25 | Tranh chấp | Hồ sơ đơn, yêu cầu bằng chứng, upload ảnh/video/biên bản; hạn phản hồi; quyết định Admin chỉ đọc; chấp nhận/khiếu nghị nếu cho phép | P1 |
| S26 | Hỏi đáp & đánh giá | Tab câu hỏi chờ trả lời và đánh giá; trả lời công khai; báo cáo vi phạm; không xóa đánh giá bất lợi; không lộ dữ liệu cá nhân | P1 |

### 6.4. Tài chính và báo cáo Shop

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| S27 | Tài chính theo đơn | Tiền hàng, shop discount, platform voucher, cơ sở tính phí, hoa hồng, phí giao, hoàn/điều chỉnh, thực nhận; truy ngược đơn/item | P0 |
| S28 | Bảng đối soát | Danh sách kỳ; dự kiến/chờ xác nhận/đang xử lý/đã chốt/sai lệch; chi tiết bút toán; xác nhận/gửi phản hồi; đơn tranh chấp bị giữ | P0 |
| S29 | Phản hồi sai lệch đối soát | Chọn bút toán, mô tả, bằng chứng; số chênh; timeline xử lý; không tự sửa bút toán | P1 |
| S30 | Báo cáo kinh doanh | Khoảng thời gian; doanh số, đơn thành công, AOV, sản phẩm bán chạy; tách hủy/trả; biểu đồ + bảng | P1 |
| S31 | Báo cáo vận hành/kho | Tồn thấp, turnover, tỷ lệ shop hủy, trả/hoàn, thời gian xác nhận/bàn giao/phản hồi; định nghĩa chỉ số rõ | P1 |

---

## 7. Danh mục màn hình Cổng Quản trị

### 7.1. Dashboard, tài khoản, quyền và shop

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| A01 | Dashboard vận hành | GMV và doanh thu sàn tách riêng; đơn/thanh toán/hoàn bất thường; tồn âm; shop/model chờ duyệt; vụ việc SLA; chất lượng giao nhận; nhật ký gần đây | P0 |
| A02 | Tài khoản người dùng | Tìm/lọc vai trò/trạng thái; chi tiết; khóa/mở có lý do; lịch sử; không xóa cứng tài khoản có giao dịch | P0 |
| A03 | Vai trò & phân quyền Admin | Danh sách vai trò/quyền; gán/thu hồi; ma trận quyền danh mục/kiểm duyệt/tài chính; xác nhận hành động nhạy cảm; audit | P0 |
| A04 | Hàng chờ duyệt Shop | Hồ sơ/tài liệu bảo vệ; kiểm tra; yêu cầu bổ sung/duyệt/từ chối lý do; timeline; không công khai tài liệu | P0 |
| A05 | Chi tiết & trạng thái Shop | Thông tin, lịch sử, chỉ số/rủi ro/vụ việc; tạm ngừng/khôi phục/đóng có lý do; tạm ngừng chỉ chặn đơn mới, giữ đơn cũ/hậu mãi/đối soát | P0 |

### 7.2. Danh mục, model, thông số và tương thích

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| A06 | Danh mục & hãng | CRUD mềm, thứ tự/slug/trạng thái; 8 nhóm MVP; kiểm tra tham chiếu; không xóa cứng dữ liệu đang dùng | P0 |
| A07 | Hàng chờ yêu cầu model | So model gần giống; tài liệu nguồn; duyệt/từ chối/yêu cầu bổ sung; chuyển hướng model đúng khi trùng; người/lý do duyệt | P0 |
| A08 | Model chuẩn | Tìm/lọc loại/hãng/trạng thái; tạo/sửa phiên bản; mã/biến thể/revision/packaging; merge có kiểm soát; lịch sử | P0 |
| A09 | Thông số & nguồn | Schema trường theo danh mục, kiểu dữ liệu/đơn vị; giá trị, nguồn URL/tài liệu, ngày kiểm tra, người duyệt; trạng thái thiếu/chưa xác định | P0 |
| A10 | Quy tắc tương thích | Danh sách/version; cặp/nhóm linh kiện; điều kiện; mức cảnh báo; thông báo/cách khắc phục; nguồn; nháp/chờ test/công bố/ngừng | P0 |
| A11 | Phòng kiểm thử Rule | Chọn cấu hình mẫu; chạy test; xem expected/actual; bốn kết quả; ca pass/fail; sửa rồi công bố; lịch sử phiên bản | P0 |

### 7.3. Kiểm duyệt và hỗ trợ

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| A12 | Hàng chờ báo cáo | Tìm/lọc loại/độ ưu tiên/SLA; phân loại; gán người xử lý; bằng chứng; yêu cầu bổ sung; không mặc định báo cáo là vi phạm | P0 |
| A13 | Kiểm duyệt tin bán | Ngữ cảnh model/offer/shop/lịch sử; giữ/yêu cầu sửa/tạm ẩn có lý do; sai model chuyển danh mục; không sửa giao dịch cũ | P0 |
| A14 | Kiểm duyệt đánh giá/hỏi đáp | Nội dung + ngữ cảnh; giữ/xử lý theo chính sách; lý do; lịch sử; bảo vệ đánh giá tiêu cực hợp lệ | P1 |
| A15 | Tranh chấp/khiếu nại | Hồ sơ hai bên; order snapshot; bằng chứng; timeline; yêu cầu phản hồi; quyết định/lý do; xem xét lại; chuyển hoàn tiền sang A19 | P0 |
| A16 | Hỗ trợ đơn & hậu mãi | Tra cứu đơn/RMA; điểm vướng; giao nhiệm vụ shop/carrier/tài chính; lịch sử; hỗ trợ chẩn đoán cấu hình đa shop không quy lỗi tùy tiện | P1 |
| A17 | Quản lý vòng đời vụ việc | Trạng thái mở/đang xử lý/chờ bên liên quan/chờ tài chính/đã đóng/mở lại; SLA; thông báo; không đóng khi hoàn tiền còn chờ | P1 |

### 7.4. Phí, khuyến mãi, giao dịch và đối soát

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| A18 | Phí & hoa hồng | Chính sách theo danh mục/shop nếu được duyệt; tỷ lệ/cơ sở/hiệu lực; preview công thức; version; không hồi tố đơn cũ | P0 |
| A19 | Chương trình khuyến mãi | Mã, loại giảm, điều kiện, giới hạn, thời hạn, bên tài trợ, loại trừ; công bố/dừng; phân bổ dòng hàng; lịch sử áp dụng | P1 |
| A20 | Vị trí tài trợ | Vị trí, nội dung, lịch hiển thị, nhãn “Tài trợ”; preview; bật/dừng; không can thiệp kết quả tương thích/tự nhiên | P2 |
| A21 | Giám sát đơn & thanh toán | Đơn treo, payment mismatch, callback trùng/muộn, tồn sai; chi tiết đối chiếu; tạo tác vụ; không sửa thu tiền tùy ý | P0 |
| A22 | Hoàn tiền & điều chỉnh | Căn cứ hủy/RMA/quyết định; số đã thu/phân bổ; duyệt số tiền; mô phỏng gửi hoàn; pending/success/fail/retry; chống trùng; bút toán điều chỉnh nếu đã đối soát | P0 |
| A23 | Lập/chốt đối soát | Chọn kỳ; tập hợp ledger chưa xử lý; phí/hoàn/điều chỉnh/held dispute; kiểm tra tổng; chốt chi trả thử nghiệm; chống tính hai lần | P0 |
| A24 | Sai lệch đối soát | Phản hồi shop; bút toán liên quan; bằng chứng; điều tra; điều chỉnh có lý do; kết quả; audit | P1 |

### 7.5. Vận chuyển, chính sách, báo cáo và audit

| ID | Màn hình | Nội dung và hành động bắt buộc | Ưu tiên |
|---|---|---|---|
| A25 | Nhà vận chuyển & dịch vụ | Danh sách tích hợp; bật/tắt tạo mới; mapping service; vùng phục vụ; cấu hình hiển thị không lộ secret; vẫn tra cứu vận đơn cũ | P1 |
| A26 | Ánh xạ trạng thái | Mã carrier → trạng thái chuẩn; version; kiểm tra thứ tự; preview ảnh hưởng; không sửa event gốc | P1 |
| A27 | Nhật ký webhook/lỗi | Event ID, carrier, tracking, chữ ký hợp lệ, trạng thái xử lý, duplicate/out-of-order/error; retry có kiểm soát; payload đã che PII/secret | P1 |
| A28 | Tra soát vận chuyển | Tìm tracking/đơn/shop; timeline event gốc + chuẩn; bằng chứng; thất lạc/hư hỏng/đã giao chưa nhận; tạo vụ việc | P1 |
| A29 | Chính sách vận hành | Thời gian giữ tồn, hạn proposal, SLA phản hồi/hậu mãi, điều kiện đối soát; hiệu lực/version; không hồi tố cam kết cũ | P1 |
| A30 | Báo cáo nền tảng | GMV, doanh thu phí, số giao dịch, build request/proposal/chuyển đổi, hủy/hoàn, thời gian phản hồi, seller/carrier quality; filter/export UI | P1 |
| A31 | Nhật ký hệ thống | Actor, thời gian, đối tượng, hành động, trước/sau đã che dữ liệu, lý do, IP/device nếu được phép; lọc và chi tiết; không chứa mật khẩu/thẻ/token | P0 |

---

## 8. Giao diện tích hợp ngoài và màn hình mô phỏng

### 8.1. Cổng thanh toán mô phỏng

Prototype phải có trang giả lập để trình diễn ba kết quả: thành công, thất bại, đang xử lý/timeout. Kết quả hiển thị mã giao dịch, số tiền và nút quay lại PCMatch. Không có COD trong luồng MVP. Không hiển thị/thu thập số thẻ thật.

### 8.2. Đơn vị vận chuyển

Đơn vị vận chuyển là hệ thống ngoài, nhân viên giao hàng không có portal đăng nhập PCMatch. UI cần phủ các điểm chạm sau:

- Người mua: chọn dịch vụ/phí/ETA; timeline; giao thất bại; bằng chứng theo quyền.
- Shop: trọng lượng/kích thước; tạo/hủy vận đơn; nhãn; lịch lấy; bàn giao; đặt lại lịch.
- Admin: cấu hình nhà vận chuyển, ánh xạ trạng thái, webhook/lỗi, tra soát.

Tám chức năng tích hợp phải được phản ánh: DVC01 báo phí/ETA; DVC02 tạo vận đơn; DVC03 xác nhận lấy; DVC04 cập nhật hành trình; DVC05 giao thành công; DVC06 giao thất bại; DVC07 chuyển hoàn/đã hoàn; DVC08 hủy trước khi lấy.

---

## 9. Thành phần giao diện dùng chung

### 9.1. Design system tối thiểu

- Màu chính gợi ý: xanh điện/indigo tạo cảm giác công nghệ; màu nhấn cyan; nền trung tính sáng. Không lạm dụng gradient.
- Màu trạng thái phải đi kèm icon + chữ: thành công, cảnh báo, lỗi, thông tin, trung tính.
- Font sans-serif hỗ trợ đầy đủ tiếng Việt. Cỡ chữ body tối thiểu 16px trên nội dung chính.
- Grid desktop 12 cột, max-width nhất quán; spacing theo thang 4/8px.
- Card, table, tabs, accordion, stepper, timeline, badge, toast, modal, drawer, dropdown, tooltip, skeleton, pagination phải có style thống nhất.
- Focus visible, tương phản đủ, điều khiển dùng được bằng bàn phím; lỗi không chỉ biểu thị bằng màu.

### 9.2. Thành phần đặc thù PCMatch

1. `ProductModelCard`: model chuẩn, thông số nổi bật, giá từ, số shop.
2. `OfferCard`: shop, giá, tồn, bảo hành, phí/ETA, cập nhật gần nhất.
3. `CompatibilityBadge`: Không tương thích / Có điều kiện / Chưa đủ dữ liệu / Đạt kiểm tra.
4. `BuildSlot`: danh mục, model/offer đã chọn, số lượng, đổi/xóa, lỗi liên quan.
5. `PriceBreakdown`: tiền hàng, shop discount, platform voucher, giao, lắp, tổng.
6. `ProposalCard`: shop, version, tổng, chênh ngân sách, hạn, cảnh báo.
7. `OrderGroup`: đơn cha và các đơn con; thanh toán và vận chuyển tách trạng thái.
8. `StatusTimeline`: order/shipment/RMA/case; không được làm trạng thái quay lùi sai.
9. `EvidenceUploader`: ảnh/video/tài liệu, dung lượng/định dạng, preview, lỗi.
10. `AuditDiff`: giá trị trước/sau, người, thời gian, lý do.

---

## 10. Từ điển trạng thái bắt buộc

| Đối tượng | Trạng thái phải thiết kế |
|---|---|
| Shop | Bản nháp, Chờ duyệt, Cần bổ sung, Hoạt động, Tạm ngừng, Đóng |
| Model request | Nháp, Chờ duyệt, Cần bổ sung, Đã duyệt, Từ chối |
| Offer | Nháp, Công khai, Ẩn, Hết hàng, Cần sửa, Bị tạm ẩn, Ngừng bán |
| Build request | Nháp, Đang nhận đề xuất, Hết hạn, Đã đóng, Đã hủy, Đã chọn proposal |
| Proposal | Nháp, Đã gửi, Cần xác nhận lại, Đã sửa, Đã chọn, Bị từ chối, Đã rút, Hết hạn |
| Tư vấn | Chờ phản hồi, Đang tư vấn, Chờ người mua xác nhận, Hoàn tất, Bị từ chối, Đã hủy |
| Compatibility | Không tương thích, Có điều kiện, Chưa đủ dữ liệu, Đạt kiểm tra |
| Order cha | Chờ thanh toán, Đã thanh toán, Đang thực hiện, Hoàn tất một phần, Hoàn tất, Đã hủy |
| Đơn con | Chờ shop xác nhận, Chuẩn bị hàng, Chờ lấy, Đang giao, Đã giao, Hoàn tất, Từ chối, Đã hủy, Đang hoàn |
| Payment | Khởi tạo, Đang xử lý, Thành công, Thất bại, Hết hạn, Cần đối chiếu, Hoàn một phần, Hoàn toàn bộ |
| Shipment | Chờ tạo, Đã tạo, Chờ lấy, Đã lấy, Đang vận chuyển, Đang giao, Đã giao, Giao thất bại, Đang hoàn, Đã hoàn, Đã hủy |
| RMA/After-sales | Mới tạo, Chờ shop, Cần bổ sung, Đã chấp nhận, Chờ gửi hàng, Đã nhận hàng, Đang kiểm tra, Đang sửa/đổi, Đề nghị hoàn, Từ chối, Hoàn tất, Tranh chấp |
| Refund | Chờ duyệt, Đã duyệt, Đang xử lý, Thành công, Thất bại, Thử lại, Đã điều chỉnh đối soát |
| Case | Mở, Đã phân loại, Đang xử lý, Chờ người mua, Chờ shop, Chờ vận chuyển, Chờ tài chính, Đã quyết định, Đã đóng, Mở lại |
| Settlement | Dự kiến, Chờ shop xác nhận, Có sai lệch, Đang xử lý, Đã chốt, Đã chi trả mô phỏng, Bị giữ một phần |

Mỗi trạng thái phải có nhãn ngắn, mô tả, hành động khả dụng và trạng thái kế tiếp hợp lệ. Không dùng chung một trạng thái để đại diện cả thanh toán, đơn hàng và vận chuyển.

---

## 11. Quy tắc nghiệp vụ phải thể hiện trực tiếp trên UI

### 11.1. Model, offer và so sánh

- Model chuẩn và tin bán là hai lớp khác nhau; UI phải ghi rõ đâu là thông số nền tảng, đâu là giá/chính sách shop.
- Không gộp biến thể/revision/RAM kit khác nhau.
- Giá rẻ nhất không mặc định là “shop tốt nhất”.
- Phí chưa xác định phải ghi “Chưa gồm” hoặc “Ước tính”, không hiển thị như số đã chốt.
- Hiển thị nguồn, ngày kiểm tra và trạng thái thiếu dữ liệu cho thông số quan trọng.

### 11.2. Build PC và tương thích

- Kiểm tra tối thiểu: CPU–Mainboard; RAM; GPU–Case; Mainboard–Case; PSU; Tản; SSD; đầu ra hình ảnh.
- “Đạt kiểm tra” không phải bảo đảm tuyệt đối; “Chưa đủ dữ liệu” không được đổi thành đạt.
- Cấu hình mua lẻ được phép thiếu thành phần; chỉ yêu cầu trọn bộ khi người dùng chọn luồng trọn bộ/lắp ráp.
- Thay model phải làm kết quả cũ thành lỗi thời và hiển thị chạy lại kiểm tra.
- Gợi ý thay thế không được tự thay món người dùng đã chọn.

### 11.3. Proposal và ngân sách

- Tổng = tiền hàng sau giảm của shop + phí giao + phí lắp − ưu đãi đủ điều kiện.
- Vượt ngân sách phải hiện số chênh và cần người mua xác nhận tăng ngân sách.
- Proposal lưu version và hạn hiệu lực; sửa yêu cầu nền làm proposal cũ cần xác nhận lại.
- Chọn proposal chưa giữ hàng, chưa tạo đơn, chưa tính hoa hồng.
- Mỗi build request chỉ có một proposal được chọn tại một thời điểm.

### 11.4. Giỏ, đơn và kho

- Giỏ không giữ tồn và không cam kết giá.
- Checkout phải kiểm tra lại giá/tồn/phí; không tự đổi model.
- Một món không hợp lệ thì không âm thầm đặt phần còn lại; yêu cầu người mua quyết định.
- Đơn cha chia đơn con theo shop. Shop A hủy không làm mất đơn Shop B.
- Tồn hiển thị: thực tế, giữ chỗ, khả dụng. Không để shop nhập tồn thực tế thấp hơn đã giữ.
- Snapshot giá, địa chỉ, model, bảo hành và chính sách của đơn cũ không đổi theo dữ liệu hiện tại.

### 11.5. Thanh toán, hoàn và đối soát

- Thanh toán/hoàn lặp không được tạo tác động trùng; UI phải có trạng thái đang đối chiếu/thử lại.
- Hoàn theo số tiền thực trả đã phân bổ tới dòng hàng, không vượt số đã thu.
- Shop không tự đánh dấu hoàn tiền thành công; shop chỉ đề nghị, Admin/tài chính xử lý.
- Đơn đang tranh chấp có thể bị giữ khỏi đối soát.
- Doanh số hàng hóa, tiền shop thực nhận và doanh thu nền tảng là ba khái niệm phải tách.

### 11.6. Vận chuyển và hậu mãi

- Mỗi đơn con có báo phí, dịch vụ và vận đơn riêng.
- “Đã giao” không đồng nghĩa “không còn quyền đổi trả/bảo hành”.
- Giao thất bại không tự hủy đơn hoặc tự hoàn tiền.
- “Đã hoàn về shop” chưa tự nhập lại tồn; shop cần kiểm tra kiện.
- Đổi trả và bảo hành là hai form/nhánh riêng; serial và chính sách lúc mua phải luôn nhìn thấy.

---

## 12. Trạng thái giao diện và trường hợp ngoại lệ bắt buộc

Mỗi màn hình quan trọng phải có mẫu cho: loading/skeleton; empty; no search results; validation error; server/integration error; unauthorized/forbidden; session expired; locked account; offline/retry; success; partial success; destructive confirmation; unsaved changes; stale data/đã có phiên bản mới.

Các ngoại lệ đặc thù cần có prototype:

1. Giá hoặc tồn đổi sau khi lưu cấu hình/proposal.
2. CPU cùng socket nhưng BIOS không đủ dữ liệu.
3. Hai khách mua món cuối; một người giữ tồn thất bại.
4. Thanh toán thành công đến sau khi reservation hết hạn.
5. Một shop trong đơn nhiều shop hủy sau thanh toán.
6. Voucher phân bổ cho nhiều dòng và trả một dòng.
7. Tạo vận đơn timeout nhưng chưa rõ đã tạo hay chưa.
8. Webhook trùng/sai thứ tự/sai chữ ký ở giao diện Admin.
9. Giao thất bại, chuyển hoàn, shop chưa xác nhận hàng hoàn.
10. Hoàn tiền pending/fail trong khi vụ việc chưa được phép đóng.

---

## 13. Responsive và khả năng tiếp cận

- Breakpoint gợi ý: mobile `<768px`, tablet `768–1199px`, desktop `≥1200px`.
- Bộ lọc desktop là sidebar; mobile là drawer có số bộ lọc đang áp dụng.
- Bảng lớn trên mobile chuyển sang card hoặc cuộn ngang có cột hành động cố định; không làm mất dữ liệu.
- PC Builder mobile dùng danh sách slot và sticky bar tổng giá/kiểm tra; desktop dùng 2 cột với summary sticky.
- Checkout mobile vẫn giữ nhóm theo shop và price summary sticky nhưng không che nội dung.
- Modal quan trọng trên mobile chuyển thành full-screen dialog/drawer.
- Hỗ trợ keyboard, focus rõ, label/aria hợp lý, target chạm đủ lớn, alt cho ảnh, thông báo lỗi bằng chữ.
- Số tiền định dạng `20.000.000 ₫`; ngày giờ theo múi giờ Việt Nam khi hiện thực, nhưng prototype cần nhất quán.

---

## 14. Ma trận truy vết chức năng → màn hình

### 14.1. Người mua NM01–NM24

| Mã | Chức năng | Màn hình phủ |
|---|---|---|
| NM01–NM06 | Đăng ký, đăng nhập, đăng xuất, khôi phục, hồ sơ/mật khẩu, địa chỉ | B08–B13 |
| NM07–NM09 | Tìm/lọc, xem model/shop, so sánh shop | B01–B07 |
| NM10 | Build PC và tư vấn chuyên gia | B14–B16, B19–B20 |
| NM11 | Cấu hình đã lưu/chia sẻ/PDF | B17–B18 |
| NM12 | Quản lý yêu cầu Build | B21–B23 |
| NM13–NM15 | Xem/so proposal, yêu cầu sửa, chọn proposal | B24–B27 |
| NM16–NM18 | Giỏ, đặt hàng, thanh toán | B28–B34 |
| NM19–NM20 | Theo dõi/hủy đơn | B35–B38 |
| NM21–NM24 | Đổi trả/bảo hành, khiếu nại/báo cáo, đánh giá, hỏi đáp | B39–B45 |

### 14.2. Chủ shop SH01–SH13 và CS01–CS24

| Nhóm | Màn hình phủ |
|---|---|
| Đăng ký/hồ sơ/nhân viên/tài khoản nhận tiền | S02–S06 |
| Model/offer/giá/tồn | S07–S11 |
| Build request/proposal/tư vấn | S12–S16 |
| Đơn/serial/giao/hủy | S17–S21 |
| Trả hàng/bảo hành/tranh chấp | S22–S25 |
| Hỏi đáp/đánh giá | S26 |
| Phí/đối soát/báo cáo | S27–S31 |

### 14.3. Quản trị danh mục DM01–DM06

| Mã | Màn hình phủ |
|---|---|
| DM01–DM04 | Danh mục/hãng, duyệt model, model chuẩn, thông số/nguồn | A06–A09 |
| DM05–DM06 | Quy tắc tương thích, kiểm thử và công bố | A10–A11 |

### 14.4. Hỗ trợ/kiểm duyệt HT01–HT06

| Mã | Màn hình phủ |
|---|---|
| HT01–HT03 | Báo cáo, tin bán, đánh giá/hỏi đáp | A12–A14 |
| HT04–HT06 | Tranh chấp, hỗ trợ đơn/hậu mãi, vòng đời vụ việc | A15–A17 |

### 14.5. Quản trị nền tảng QT01–QT11

| Mã | Màn hình phủ |
|---|---|
| QT01–QT03 | Tài khoản/quyền, duyệt shop, trạng thái shop | A02–A05 |
| QT04–QT06 | Phí/hoa hồng, khuyến mãi, vị trí tài trợ | A18–A20 |
| QT07–QT09 | Giám sát giao dịch, hoàn/điều chỉnh, đối soát | A21–A24 |
| QT10–QT11 | Chính sách vận hành, báo cáo và audit | A29–A31 |

### 14.6. Vận chuyển DVC01–DVC08

| Mã | Màn hình phủ |
|---|---|
| DVC01 | B29–B30 |
| DVC02–DVC03 | S19–S20 |
| DVC04–DVC07 | B37, S20, A27–A28 |
| DVC08 | S20, A28 |

Kết luận truy vết: toàn bộ 60 nhóm chức năng trong tài liệu tổng hợp, 24 chức năng chi tiết Chủ shop và 8 chức năng vận chuyển đều có ít nhất một màn hình/điểm chạm UI.

### 14.7. Danh mục mã chức năng đầy đủ để kiểm tra tự động

**Người mua:**

- NM01 Đăng ký tài khoản; NM02 Đăng nhập; NM03 Đăng xuất; NM04 Khôi phục mật khẩu.
- NM05 Quản lý hồ sơ và mật khẩu; NM06 Quản lý địa chỉ giao hàng; NM07 Tìm kiếm và lọc linh kiện; NM08 Xem thông tin linh kiện và shop.
- NM09 So sánh tin bán giữa các shop; NM10 Xây dựng cấu hình PC và nhận tư vấn chuyên gia; NM11 Quản lý cấu hình đã lưu; NM12 Quản lý yêu cầu Build PC.
- NM13 Xem và so sánh đề xuất cấu hình; NM14 Yêu cầu shop chỉnh sửa đề xuất; NM15 Chọn đề xuất cấu hình; NM16 Quản lý giỏ hàng.
- NM17 Đặt hàng; NM18 Thanh toán đơn hàng; NM19 Theo dõi đơn hàng; NM20 Yêu cầu hủy đơn hàng.
- NM21 Yêu cầu đổi trả hoặc bảo hành; NM22 Gửi khiếu nại hoặc báo cáo vi phạm; NM23 Đánh giá sản phẩm và shop; NM24 Đặt câu hỏi trước khi mua.

**Chủ shop theo 13 nhóm tổng hợp:**

- SH01 Đăng ký mở shop; SH02 Quản lý hồ sơ gian hàng; SH03 Quản lý nhân viên và quyền hạn.
- SH04 Quản lý tin bán linh kiện; SH05 Quản lý giá và tồn kho; SH06 Gửi yêu cầu bổ sung model.
- SH07 Tiếp nhận yêu cầu Build PC; SH08 Quản lý đề xuất cấu hình; SH09 Xử lý đơn hàng và giao hàng.
- SH10 Xử lý đổi trả và bảo hành; SH11 Phản hồi hỏi đáp, đánh giá và khiếu nại; SH12 Xem tài chính và đối soát; SH13 Xem thống kê kinh doanh.

**Chủ shop theo 24 chức năng chi tiết:**

| Mã | Chức năng | Màn hình chính |
|---|---|---|
| CS01 | Đăng ký mở gian hàng và gửi hồ sơ xác minh | S02–S03 |
| CS02 | Thiết lập thông tin gian hàng và địa chỉ kho | S04 |
| CS03 | Quản lý và phân quyền tài khoản nhân viên | S06 |
| CS04 | Quản lý tài khoản ngân hàng nhận tiền | S05 |
| CS05 | Yêu cầu bổ sung model linh kiện chuẩn | S07–S08 |
| CS06 | Đăng tin bán linh kiện mới | S09–S10 |
| CS07 | Quản lý danh sách tin bán và điều chỉnh giá | S09–S10 |
| CS08 | Quản lý tồn thực tế và tồn giữ chỗ | S11 |
| CS09 | Tiếp nhận và lọc yêu cầu Build PC | S12–S13 |
| CS10 | Lập và gửi đề xuất cấu hình | S14 |
| CS11 | Chỉnh sửa hoặc rút đề xuất | S15 |
| CS12 | Phản hồi tư vấn cấu hình tự chọn | S16 |
| CS13 | Tiếp nhận và xác nhận đơn hàng con | S17–S18 |
| CS14 | Đóng gói, cập nhật serial và bàn giao vận chuyển | S19–S20 |
| CS15 | Khai báo từ chối/hủy đơn hàng con | S21 |
| CS16 | Tiếp nhận và xử lý trả hàng/hoàn tiền | S22–S23 |
| CS17 | Tiếp nhận và cập nhật tiến độ bảo hành | S22, S24 |
| CS18 | Phản hồi và cung cấp bằng chứng tranh chấp | S25 |
| CS19 | Theo dõi thu phí và hoa hồng từng đơn | S27 |
| CS20 | Xem và xác nhận bảng đối soát kỳ | S28–S29 |
| CS21 | Xem báo cáo doanh số và hiệu quả kinh doanh | S30 |
| CS22 | Xem thống kê tồn kho và tỷ lệ hủy/hoàn | S31 |
| CS23 | Trả lời đánh giá sản phẩm và dịch vụ | S26 |
| CS24 | Giải đáp câu hỏi trước mua | S26 |

**Quản trị danh mục:** DM01 Quản lý danh mục và hãng; DM02 Duyệt yêu cầu model; DM03 Quản lý model chuẩn; DM04 Quản lý thông số và nguồn; DM05 Quản lý quy tắc tương thích; DM06 Kiểm thử và công bố quy tắc.

**Hỗ trợ và kiểm duyệt:** HT01 Tiếp nhận/phân loại báo cáo; HT02 Kiểm duyệt tin bán; HT03 Kiểm duyệt đánh giá/hỏi đáp; HT04 Xử lý khiếu nại/tranh chấp; HT05 Hỗ trợ đơn hàng/hậu mãi; HT06 Theo dõi và kết thúc vụ việc.

**Quản trị nền tảng:** QT01 Quản lý tài khoản và phân quyền; QT02 Duyệt đăng ký shop; QT03 Quản lý trạng thái shop; QT04 Cấu hình phí/hoa hồng; QT05 Quản lý khuyến mãi; QT06 Quản lý vị trí tài trợ; QT07 Giám sát đơn và thanh toán; QT08 Quản lý hoàn tiền/điều chỉnh; QT09 Lập và chốt đối soát; QT10 Cấu hình chính sách vận hành; QT11 Xem báo cáo và nhật ký.

**Đơn vị vận chuyển:** DVC01 Báo phương thức/phí/ETA; DVC02 Tạo vận đơn; DVC03 Xác nhận lấy hàng; DVC04 Cập nhật hành trình; DVC05 Xác nhận giao thành công; DVC06 Ghi nhận giao thất bại; DVC07 Chuyển hoàn/xác nhận hoàn; DVC08 Hủy vận đơn trước khi lấy.

---

## 15. Dữ liệu mẫu tối thiểu cho prototype

AI phải tạo bộ dữ liệu giao diện nhất quán xuyên suốt các trang, không tạo mỗi trang một câu chuyện khác nhau.

Gợi ý scenario chính:

- Người mua: Nguyễn Minh, ngân sách 20.000.000 ₫, mục tiêu lập trình + gaming 1080p.
- Shop: BuildPro Sài Gòn và TechZone Hà Nội, cùng bán một số model nhưng giá/bảo hành khác nhau.
- Model mẫu: Ryzen 5 7600; MSI PRO B650M-A WIFI; Kingston Fury DDR5 32GB; ASUS Dual RTX 5060; WD Black SN770 1TB; Corsair RM750e; Montech Air 100; DeepCool AK400.
- Proposal A: 19.600.000 ₫ trong ngân sách; Proposal B: 20.500.000 ₫ vượt 500.000 ₫.
- Đơn cha `PCM-260916-001` gồm hai đơn con; một giao thành công, một shop hủy để minh họa hoàn một phần.
- Build ID `BLD-MINH-2026-001`; mỗi item có serial và shop chịu trách nhiệm riêng.

Dữ liệu phải giữ đúng quan hệ giá, tổng, trạng thái, shop, đơn và serial khi người dùng điều hướng giữa các màn hình.

---

## 16. Cấu trúc thư mục gợi ý cho giai đoạn HTML/CSS

```text
pcmatch-ui/
├── index.html
├── buyer/
├── shop/
├── admin/
├── auth/
├── states/
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── images/
│   └── icons/
└── README.md
```

Không bắt buộc đúng cấu trúc trên, nhưng phải có một trang index/sitemap cho phép người kiểm tra mở được mọi màn hình và mọi trạng thái mà không cần biết URL.

---

## 17. Tiêu chí nghiệm thu prototype giao diện

Prototype chỉ được xem là hoàn tất khi:

- [ ] Có sitemap/index tới toàn bộ B01–B45, S01–S31 và A01–A31 hoặc màn hình tương đương không làm mất chức năng.
- [ ] Ba không gian Buyer/Shop/Admin có layout và navigation nhất quán, phân biệt rõ.
- [ ] Hai luồng cốt lõi chạy được bằng liên kết: tự build → giỏ → checkout → đơn; đăng nhu cầu → shop gửi proposal → người mua so sánh/chọn → checkout.
- [ ] Có luồng mở shop → duyệt → đăng offer → quản lý tồn → nhận/xử lý đơn.
- [ ] Có luồng đổi trả/bảo hành → shop xử lý → tranh chấp/hoàn tiền → đối soát.
- [ ] Có luồng báo phí → tạo vận đơn → lấy hàng → giao thành công/thất bại/chuyển hoàn.
- [ ] Tất cả trạng thái trong Mục 10 có ít nhất một biểu diễn UI.
- [ ] Tất cả chức năng trong ma trận Mục 14 được đánh dấu đã thiết kế và có liên kết mở được.
- [ ] Có responsive desktop/mobile cho ít nhất các trang đại diện: Home, Search, Model, Builder, Proposal Compare, Checkout, Order Detail, Shop Dashboard, Shop Order, Admin Dashboard, Rule Editor.
- [ ] Có loading, empty, error, permission và confirmation state cho các nhóm màn hình chính.
- [ ] Không có COD, hàng cũ, ví shop, AI tự sinh cấu hình hoặc lắp ráp đa shop trong luồng MVP khả dụng.
- [ ] Không dùng quảng cáo để thay đổi kết luận tương thích hoặc ngụy trang kết quả tự nhiên.
- [ ] README ghi rõ mapping màn hình → mã chức năng và hướng dẫn mở prototype.

---

## 18. Những quyết định còn cần nhóm xác nhận trước khi code nghiệp vụ

Các điểm sau không chặn việc thiết kế HTML/CSS, nhưng phải để cấu trúc UI đủ linh hoạt:

1. Khôi phục mật khẩu bằng email link hay OTP.
2. Giỏ hàng chưa đăng nhập lưu local hay chỉ tạo sau đăng nhập.
3. Bộ trường đăng ký/tài liệu xác minh shop chính thức.
4. Nhà cung cấp thanh toán/giao nhận thật và phương thức online cụ thể.
5. Thời gian giữ tồn, hạn proposal, SLA phản hồi và hậu mãi.
6. Công thức/tỷ lệ phí cuối cùng theo danh mục.
7. Cơ chế mời nhân viên và quyền mẫu.
8. Có xuất PDF thật ở MVP hay chỉ trang in; UI vẫn phải có hành động Xuất PDF.
9. Quyền sửa/xóa đánh giá trong thời gian nào và quy trình mở lại vụ việc.
10. Bộ thông số/bộ lọc chính xác cho từng danh mục linh kiện.

Cho đến khi có quyết định mới, prototype dùng giá trị mẫu và gắn nhãn “Dữ liệu minh họa”, không biến giả định thành chính sách pháp lý hoặc cam kết thương mại.

---

## 19. Tóm tắt giao việc cho AI thiết kế

Hãy thiết kế một marketplace linh kiện PC tiếng Việt tên **PCMatch**, ưu tiên người cần cấu hình theo ngân sách nhưng vẫn phục vụ người tự build/nâng cấp. Tạo đầy đủ giao diện công khai, tài khoản người mua, cổng Shop và cổng Quản trị theo danh mục màn hình ở Mục 5–7. Dùng dữ liệu mẫu liên tục ở Mục 15, hệ trạng thái ở Mục 10 và quy tắc ở Mục 11. Mọi chức năng trong ma trận Mục 14 phải có điểm chạm rõ ràng. Kết quả là prototype HTML/CSS responsive, có sitemap để duyệt toàn bộ trang và trạng thái; chưa kết nối backend, không tự bổ sung chức năng ngoài phạm vi.
