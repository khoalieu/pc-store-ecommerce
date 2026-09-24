# Bảng nghiệm thu Buyer B01–B45

Mỗi mã là trang hoặc thành phần, không bắt buộc một file riêng. Sitemap là điểm vào; màn riêng cần chọn ID từ danh sách của tài khoản. Tất cả tương tác dưới đây là frontend/localStorage, không xác nhận backend đã đạt. B16 là tiện ích P2 chưa triển khai theo phạm vi tài liệu.

| Mã | Trang/thành phần | Đường mở | JS đã có | Mô phỏng / cần backend |
|---|---|---|---|---|
| B01 | Trang chủ — `buyer/home.html` | Logo / Trang chủ | Hiển thị danh mục/sản phẩm; điều hướng | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B02 | Tìm kiếm — `buyer/search.html` | Ô tìm Home / header | Tìm/lọc/sắp xếp/phân trang và lưu URL | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B03 | Danh mục linh kiện — `buyer/search.html` | Thẻ danh mục Home | Lọc đúng loại và thông số | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B04 | Chi tiết model — `buyer/model.html?id=CPU-7600` | Kết quả tìm hoặc sản phẩm shop → chọn model | Thông số/offer/ảnh dự phòng | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B05 | So sánh offer cùng model — `buyer/model.html?id=CPU-7600&compareOffers=1` | Model → So sánh shop | So giá/phí/bảo hành/tồn của cùng model | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B06 | So sánh linh kiện — `buyer/compare.html` | Search → Thêm so sánh → khay so sánh | Chọn/bỏ/xóa model cùng danh mục | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B07 | Gian hàng công khai — `buyer/shop.html?id=BP` | Tên shop trong offer | Lọc sản phẩm và mở đúng offer | Demo trình duyệt; Catalogue, tìm kiếm, giá/tồn/phí thật |
| B08 | Đăng ký — `auth/login.html?mode=register` | Đăng nhập → Tạo tài khoản | Validation, lưu user ID, quay lại tác vụ | Demo trình duyệt; Xác thực, hash mật khẩu phía server, phiên và phân quyền |
| B09 | Đăng nhập — `auth/login.html` | Tài khoản hoặc cổng thao tác riêng | Kiểm tra mật khẩu demo; giữ giỏ và ngữ cảnh | Demo trình duyệt; Xác thực, hash mật khẩu phía server, phiên và phân quyền |
| B10 | Khôi phục mật khẩu — `auth/login.html?mode=recover` | Đăng nhập → Quên mật khẩu → link demo | Tạo link, hết hạn/đã dùng, đặt mật khẩu mới | Demo trình duyệt; Xác thực, hash mật khẩu phía server, phiên và phân quyền |
| B11 | Trung tâm tài khoản — `buyer/account.html` | Menu tài khoản → Hồ sơ | Sửa/hủy hồ sơ, đổi mật khẩu, đăng xuất | Demo trình duyệt; Xác thực, hash mật khẩu phía server, phiên và phân quyền |
| B12 | Địa chỉ — `buyer/addresses.html` | Tài khoản hoặc checkout → Địa chỉ | Thêm/sửa/xóa/chọn; snapshot đơn không đổi | Demo trình duyệt; Lưu địa chỉ và phân quyền |
| B13 | Trung tâm thông báo — `buyer/notifications.html` | Menu Thông báo | Đọc/chưa đọc, mở đúng đối tượng | Demo trình duyệt; Thông báo server và quyền đối tượng |
| B14 | PC Builder — `buyer/builder.html` | Home / menu → Tự build | 8 slot, giá từng shop, kiểm tra tương thích | Demo trình duyệt; Dữ liệu kỹ thuật và quy tắc được xác minh |
| B15 | Chọn linh kiện cho slot — `buyer/builder.html` | Builder → slot → Search → Model → offer | Giữ slot/build/version, thay đúng offer | Demo trình duyệt; Dữ liệu kỹ thuật và quy tắc được xác minh |
| B16 | So sánh cấu hình — `buyer/builds.html` | Ngoài phạm vi P2; link sitemap mở danh sách bản lưu | Chưa triển khai so nhiều cấu hình tự lưu | Demo trình duyệt; Phạm vi P2 cần chốt |
| B17 | Cấu hình đã lưu — `buyer/builds.html` | Builder → Cấu hình đã lưu | Lưu/mở/đổi tên/xóa | Demo trình duyệt; Lưu dữ liệu, quyền và chia sẻ qua thiết bị |
| B18 | Cấu hình chia sẻ — `buyer/builds.html` | Bản lưu → Tạo liên kết → Xem bản chỉ đọc | Chỉ đọc, tạo/thu hồi link trong cùng trình duyệt | Demo trình duyệt; Lưu dữ liệu, quyền và chia sẻ qua thiết bị |
| B19 | Tạo yêu cầu tư vấn — `buyer/consultation.html?new=1` | Builder → Gửi shop tư vấn | Snapshot cấu hình, shop, câu hỏi, ngân sách | Demo trình duyệt; Trao đổi shop thật, quyền và kiểm soát phiên bản |
| B20 | Chi tiết tư vấn — `buyer/consultation.html` | Danh sách tư vấn / thông báo → đúng ID | Bổ sung, phản hồi, áp dụng/giữ, lịch sử phiên bản | Demo trình duyệt; Trao đổi shop thật, quyền và kiểm soát phiên bản |
| B21 | Danh sách yêu cầu Build — `buyer/requests.html` | Home / menu → Theo ngân sách | Danh sách/lọc/trạng thái | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B22 | Tạo/sửa yêu cầu — `buyer/requests.html?new=1` | Danh sách yêu cầu → Tạo hoặc Sửa | Validation, giữ nháp, xem lại, lưu/đăng | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B23 | Chi tiết yêu cầu — `buyer/requests.html` | Danh sách yêu cầu → Mở yêu cầu | Chi tiết, gia hạn/đóng/hủy, proposal nhận được | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B24 | Chi tiết proposal — `buyer/requests.html` | Yêu cầu → proposal → Chi tiết | Món/giá/BH/phí/tổng/hạn/version | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B25 | So sánh proposal — `buyer/requests.html` | Yêu cầu → So sánh các bản hiện tại | So đủ món/phí/điều kiện trong cùng yêu cầu | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B26 | Yêu cầu chỉnh sửa proposal — `buyer/requests.html` | Chi tiết proposal → Yêu cầu chỉnh sửa | Gửi phản hồi, thử lại, shop tạo v mới | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B27 | Xác nhận chọn proposal — `buyer/requests.html` | Proposal → Chọn → modal xác nhận | Kiểm tra hiệu lực, thay giỏ một shop | Demo trình duyệt; Yêu cầu/báo giá shop thật, phiên bản và thông báo |
| B28 | Giỏ hàng — `buyer/cart.html` | Header / thêm offer / Builder / Proposal | Nhóm shop, số lượng, xóa có xác nhận | Demo trình duyệt; Giỏ bền vững, kiểm tra tồn đồng thời |
| B29 | Checkout — `buyer/checkout.html` | Giỏ → Checkout → đăng nhập nếu cần | Địa chỉ, tổng và tạo đúng đơn | Demo trình duyệt; Giá/phí/voucher/giữ tồn và idempotency server |
| B30 | Chọn vận chuyển — `buyer/checkout.html` | Checkout → dịch vụ từng shop | Tính lại theo vùng/dịch vụ/shop | Demo trình duyệt; Giá/phí/voucher/giữ tồn và idempotency server |
| B31 | Áp dụng mã giảm giá — `buyer/checkout.html` | Checkout → mã ưu đãi | Điều kiện, hết hạn, phân bổ giảm | Demo trình duyệt; Giá/phí/voucher/giữ tồn và idempotency server |
| B32 | Kiểm tra thay đổi trước đặt — `buyer/checkout.html` | Checkout → thay đổi + checkbox | Đối chiếu cũ/mới và xác nhận chủ động | Demo trình duyệt; Giá/phí/voucher/giữ tồn và idempotency server |
| B33 | Thanh toán mô phỏng — `buyer/orders.html` | Đặt đơn → payment với đúng ID | Đang xử lý/thành công/lỗi/chưa rõ/hết hạn | Demo trình duyệt; Cổng thanh toán, webhook và đối soát |
| B34 | Kết quả đặt hàng — `buyer/orders.html` | Payment thành công → kết quả cùng ID | Đơn cha/con, tổng, link theo dõi | Demo trình duyệt; Cổng thanh toán, webhook và đối soát |
| B35 | Lịch sử đơn — `buyer/orders.html` | Menu Đơn hàng | Tìm mã, lọc thanh toán, trạng thái từng shop | Demo trình duyệt; Đơn/nhật ký/quyền và đồng bộ shop |
| B36 | Chi tiết đơn — `buyer/orders.html` | Danh sách đơn / kết quả → đúng ID | Snapshot món/địa chỉ/tiền, trạng thái và khoản hoàn | Demo trình duyệt; Đơn/nhật ký/quyền và đồng bộ shop |
| B37 | Theo dõi vận chuyển — `buyer/orders.html` | Đơn con → Theo dõi giao nhận | Vận đơn, các mốc, giao thất bại không tự hoàn | Demo trình duyệt; Tích hợp vận chuyển và webhook |
| B38 | Yêu cầu hủy đơn — `buyer/orders.html` | Đơn con đủ điều kiện → Yêu cầu hủy | Lý do, chờ duyệt/duyệt/từ chối độc lập | Demo trình duyệt; Chính sách hủy, shop phê duyệt, hoàn tiền thật |
| B39 | Trung tâm bảo hành Build ID — `buyer/cases.html` | Tài khoản → Hồ sơ hỗ trợ → hàng đã giao | Dòng hàng/serial/thời hạn và shop phụ trách | Demo trình duyệt; Serial/chính sách/sổ bảo hành thật |
| B40 | Tạo hồ sơ hậu mãi — `buyer/orders.html` | Dòng hàng đã giao → Đổi/trả hoặc bảo hành | Số lượng/serial/chính sách/bằng chứng/validation | Demo trình duyệt; Serial/chính sách/sổ bảo hành thật |
| B41 | Chi tiết hậu mãi — `buyer/cases.html` | Danh sách hồ sơ / thông báo → đúng ID | Bổ sung, gửi/nhận, sửa/đổi/hoàn và lịch sử | Demo trình duyệt; Serial/chính sách/sổ bảo hành thật |
| B42 | Khiếu nại/tranh chấp — `buyer/orders.html` | Đơn → Khiếu nại; model/shop/offer → Báo cáo | Tách giao dịch có quyền và nội dung không cần đơn | Demo trình duyệt; Tiếp nhận và xử lý tranh chấp/kiểm duyệt |
| B43 | Chi tiết vụ việc — `buyer/cases.html` | Danh sách hồ sơ → hồ sơ khiếu nại/báo cáo | Theo dõi riêng tư, phản hồi, đề nghị xem xét lại | Demo trình duyệt; Tiếp nhận và xử lý tranh chấp/kiểm duyệt |
| B44 | Viết/sửa đánh giá — `buyer/orders.html` | Dòng hàng đã giao → Viết/sửa đánh giá | Kiểm tra đã giao, hai điểm riêng, sửa/lịch sử | Demo trình duyệt; Xác minh mua hàng, kiểm duyệt và chống trùng |
| B45 | Hỏi đáp trước mua — `buyer/model.html?id=CPU-7600` | Model → Hỏi đáp → chọn shop | Câu hỏi đúng model/shop; phản hồi demo | Demo trình duyệt; Lưu/kiểm duyệt và shop trả lời thật |

## Đối chiếu mục E

- Điều hướng và ID: kiểm tra link HTML, anchor và 45 điểm vào sitemap; chi tiết riêng lấy ID từ danh sách, không thay bằng đơn mẫu.
- Trạng thái: native loading, empty, validation tại trường, lỗi thao tác mô phỏng và thử lại; session/link/proposal/payment hết hạn.
- Tiền: số lượng/ưu đãi/phí tính lại; checkbox chủ động; món đã có không vào mua; hoàn không vượt phần đã thu.
- Nhiều shop: đơn con, vận đơn, hủy và hoàn độc lập; bằng chứng riêng tư chỉ xem trong tài khoản sở hữu.
- Bốn hành trình: `purchase-flows.js`, `build-flows.js`, `aftersale-flows.js`; xác nhận UI bằng trình duyệt, không thay thế kiểm thử backend.
- Hỗ trợ P2 ngoài phạm vi: so cấu hình tự lưu B16, PDF và kho bài viết lớn. Trợ giúp cơ bản và biên nhận JSON demo đã có.
