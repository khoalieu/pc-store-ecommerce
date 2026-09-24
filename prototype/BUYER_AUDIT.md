# Đối chiếu phần thiếu của giao diện người mua PCMatch

Nguồn: “Kiểm thử giao diện.docx” do người dùng cung cấp tại `/home/khoa/Downloads/Kiểm thử giao diện.docx`, mục A, B1–B24, C–E. Đối chiếu mã thực tế trước khi sửa, không coi mô tả “hiện trạng” trong tài liệu là trạng thái hiện tại của repository.

Home mua sắm, các trang buyer bổ sung và phần lớn luồng đã tồn tại trước đợt này. Giữ chúng, không tạo lại các trang. Tài liệu này dùng mã B1–B24 của **mục B tài liệu kiểm thử**, không nhầm với mã B01–B45 của sitemap.

## A — Các trang hiện có

| Mục | Phần đã có được giữ | Bổ sung/sửa trong đợt |
| --- | --- | --- |
| A1 Home | Sản phẩm, 8 danh mục đúng URL, giỏ/tài khoản; Builder là lối bổ sung | Tài khoản chưa có yêu cầu đi tới form ngân sách, tài khoản đã có đi tới danh sách |
| A2 Search | Từ khóa, giá/hãng/thông số/tồn, sort, phân trang, trạng thái lỗi/empty | Link trở về từ chi tiết giữ toàn bộ bộ lọc và trang; bỏ chip đặt lại trang |
| A3 Model/offer | Mô tả, model/offer riêng, số lượng, giỏ/Builder, khu vực, hỏi đáp/đánh giá | Đúng offer từ gian hàng được đưa lên đầu và đánh dấu; tổng món + giao; điểm/số đánh giá lấy từ giao dịch demo; không hiển thị giá vô cực khi hết offer |
| A4 Builder | 8 slot, kiểm tra kỹ thuật, đã có/cần mua, mua lẻ/trọn bộ | Bản lưu hiện thời điểm cập nhật và cảnh báo thay đổi giá/tồn/ngừng bán; không dùng lại ID bản lưu của tài khoản khác |
| A5 Proposal | Chi tiết, sửa, chọn, giỏ đúng một shop | Dòng thành tiền, liên kết đúng shop, liên kết bản trước/chênh tiền, nhãn hết hạn; kiểm tra lại giá ở xác nhận cuối |
| A6 Checkout | Địa chỉ, phí từng shop, PC100, xác nhận chủ động, thanh toán sandbox | Diff bảo hành/phụ kiện; lỗi báo phí/thử lại; voucher shop BP50 và quy tắc loại trừ; so lại dữ liệu với bản người mua đã xem |
| A7 Order | Đúng mã đơn/đơn con, snapshot, theo dõi, hủy/hậu mãi | Nguồn proposal, dịch vụ giao/ETA, nhánh chuyển hoàn; duyệt/từ chối yêu cầu hủy trước thanh toán; chặn thanh toán khi hủy đang xử lý |

## B — Các thành phần chức năng

| Mục | Kết quả đối chiếu |
| --- | --- |
| B1 Đăng ký | Form/validation/chống bấm lặp đã có; giữ ngữ cảnh và bản nháp khi đăng nhập từ tác vụ công khai |
| B2 Xác thực/khôi phục | Các màn đã có; bổ sung giải thích cần phiên còn hiệu lực và thông báo đặt lại mật khẩu thành công |
| B3 Hồ sơ | Đã có sửa/đổi mật khẩu; hủy thay đổi xóa đúng bản nháp, không lưu mật khẩu kể cả khi đã hiện dạng text |
| B4 Địa chỉ | CRUD/chọn tại checkout/snapshot đã có; bản nháp riêng cho từng địa chỉ, tránh lẫn form thêm và sửa |
| B5 Gian hàng | Đã có trang; lấy offer qua quan hệ shopId/modelId, trạng thái/ngừng bán, empty, đánh giá sau mua và liên kết tư vấn đúng shop |
| B6 So sánh | Bảng model và thẻ offer đã có; bổ sung tổng tiền + giao và dữ liệu đánh giá shop thực sự có trong demo |
| B7 Chọn slot | Đã có đúng danh mục/phiên bản, đổi/xóa/số lượng/đã có; không tạo drawer hoặc trang trùng |
| B8 Cấu hình lưu/chia sẻ | Đã có lưu/mở/xóa/chia sẻ/thu hồi; thêm thời điểm và cảnh báo thay đổi. PDF/so hai cấu hình là P2 chưa chốt |
| B9 Gửi tư vấn | Đã có form và bản gửi; giữ shop từ gian hàng, kiểm tra shop có nhận tư vấn |
| B10 Theo dõi tư vấn | Giữ snapshot mỗi bản đã gửi khi cập nhật; có kết thúc/hủy, chặn thao tác trên tư vấn đã kết thúc |
| B11 Yêu cầu ngân sách | Đã có form/xem lại/nháp/đăng/sửa; bỏ kho nháp dùng chung, giữ nháp khi hủy preview, lọc hết hạn |
| B12 Chi tiết yêu cầu | Đã có vòng đời và danh sách proposal; liên kết đơn tạo từ yêu cầu, không dùng trạng thái yêu cầu thay cho đơn |
| B13 Chi tiết proposal | Đã có giá/phí/bảo hành/hiệu lực/vượt ngân sách; thêm thành tiền từng dòng, chênh bản trước, trạng thái hết hạn |
| B14 Sửa/chọn proposal | Đã có phản hồi và bản sửa; chặn sửa báo giá cũ/đã chọn và chặn sinh nhiều bản sửa từ cùng trạng thái; kiểm tra giá khi xác nhận |
| B15 Giỏ | Đã có nhóm shop, số lượng/xóa/empty; đếm giỏ cập nhật sau render; thêm món vào proposal phải xác nhận chuyển sang mua lẻ và bỏ cam kết trọn bộ |
| B16 Checkout | Bổ sung diff bảo hành/phụ kiện, chặn dữ liệu đổi sau lúc xem, lỗi phí/thử lại và ưu đãi shop với phân bổ rõ |
| B17 Thanh toán | Các nhánh thành công/thất bại/chưa rõ/hết hạn đã có; kết quả thành công hiện các mã đơn con; không ghi đè trạng thái hủy bằng kết quả thanh toán |
| B18 Lịch sử/hủy | Đã có danh sách/lọc/hủy riêng shop; nút quay lại modal không bị trường lý do required chặn; lỗi lưu giữ modal để thử lại |
| B19 Giao/hoàn tiền | Timeline và khoản hoàn có căn cứ đã có; thêm dịch vụ/ETA và đang hoàn hàng/đã hoàn hàng, không tự hoàn tiền từ giao thất bại |
| B20 Tạo hậu mãi | Form/điều kiện/snapshot/tệp đã có; bổ sung shop và serial của hồ sơ |
| B21 Theo dõi hậu mãi | Bổ sung tệp bằng chứng về sau, gửi hàng/nhận lại, serial đổi mới, liên kết khiếu nại; khoản hoàn tiếp tục nằm riêng tại đơn |
| B22 Khiếu nại/báo cáo | Các form đã có; nối khiếu nại từ hồ sơ với đơn con và hồ sơ nguồn; thêm bằng chứng vào hồ sơ đang có |
| B23 Đánh giá/hỏi đáp | Đã có hai luồng riêng; giữ câu hỏi qua xác thực, hiển thị lịch sử sửa đánh giá của người mua |
| B24 Thông báo/trợ giúp | Các trang đã có; thêm loại thông báo, đối chiếu báo giá sắp/hết hạn khi mở thông báo và không tạo thông báo thời hạn trùng |

## C–E — Phạm vi kiểm tra

- Đã duyệt toàn bộ trang HTML buyer/auth và các trang Shop/Admin/States trước sửa. Buyer không có CTA `href="#"`; Shop/Admin còn nút minh họa ngoài phạm vi yêu cầu.
- Suite nền `tests/buyer-flows.js`: mua khách → đăng ký → địa chỉ → checkout hai shop → lỗi tồn/đổi phí → thanh toán các kết quả → đơn con → đánh giá/hủy/hậu mãi; Builder đã có không vào giỏ; proposal một shop giữ phí lắp.
- Suite bổ sung `tests/buyer-regressions.js`: ngữ cảnh lọc/shop/tư vấn, bản nháp qua đăng nhập/theo địa chỉ, lịch sử phiên bản, diff bảo hành, lỗi phí, voucher loại trừ/hết hạn, xác nhận lại khi dữ liệu đổi, lỗi quota và thử lại, tệp bổ sung, serial đổi mới, proposal hết hạn, không trùng thông báo.
- Responsive: suite nền kiểm tra 12 route ở 360/768/1440px; suite bổ sung kiểm tra 20 route ở ba độ rộng, lỗi render và link rỗng; kiểm tra Escape menu mobile và ảnh model.
- Dữ liệu kiểm thử tạo trong profile Chrome riêng, không sửa kho demo của trình duyệt người dùng.

## Giới hạn và quyết định chưa chốt

Đây là nghiệm thu thao tác frontend với dữ liệu trong trình duyệt. Phân quyền thật, tính nguyên tử nhiều máy, chống đặt/thu/hoàn trùng qua mạng, tồn kho, xác minh tài khoản, kiểm duyệt nội dung và thanh toán/vận chuyển cần backend. Các kịch bản shop/nhà vận chuyển nằm trong khối “mô phỏng”, không phải kết nối thực tế.

Giỏ demo dùng chung thiết bị và giữ qua đăng nhập, không có chính sách ghép giỏ trên server. Chia sẻ chỉ trong kho trình duyệt. Phí, khuyến mại, thời hạn hậu mãi là quy ước kiểm thử được ghi rõ tại UI. Mô hình hiện tại giới hạn một khoản hoàn trên mỗi đơn con; hoàn từng phần nhiều lần và chính sách cộng dồn cần chốt trước khi mở rộng. Không tự bổ sung PDF, so cấu hình tự lưu hoặc FAQ lớn thuộc đợt P2 trong tài liệu.
