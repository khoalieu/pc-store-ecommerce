---
name: PCMatch Precision Commerce
description: Hệ giao diện thương mại kỹ thuật trưởng thành, giúp người mua, shop và quản trị viên đọc nhanh cấu hình, trách nhiệm và trạng thái vận hành.
colors:
  cobalt-primary: "#2563EB"
  cobalt-deep: "#1D4ED8"
  cobalt-soft: "#EFF6FF"
  teal-verified: "#0F9F91"
  teal-deep: "#08756C"
  teal-soft: "#ECFDF9"
  amber-warning: "#D97706"
  amber-deep: "#92400E"
  amber-soft: "#FFF7ED"
  red-critical: "#C9344A"
  red-deep: "#A61F35"
  red-soft: "#FFF1F3"
  ink: "#172033"
  slate: "#5C6778"
  canvas: "#F5F7FA"
  surface: "#FFFFFF"
  border: "#DFE5EC"
  muted: "#EDF1F5"
typography:
  display:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 4vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  pageTitle:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "clamp(1.9rem, 2.4vw, 2.55rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 650
    lineHeight: 1.3
rounded:
  control: "9px"
  panel: "14px"
  status: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "20px"
  space-6: "24px"
  space-8: "32px"
  space-10: "40px"
  space-12: "48px"
  space-16: "64px"
  space-18: "72px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "0 17px"
    height: "42px"
  panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 13px"
    height: "44px"
---

# Design System: PCMatch Precision Commerce

## Hướng thị giác

**Creative North Star: “Precision Commerce Workspace.”**

PCMatch phải giống một sản phẩm thương mại đang vận hành thật: rõ ràng như công cụ cấu hình, đáng tin như hệ thống đơn hàng và đủ ấm để người mua phổ thông không cảm thấy đang dùng phần mềm kỹ thuật nội bộ. Giao diện ưu tiên khả năng quét, nhận biết trạng thái và ra quyết định. Cá tính thương hiệu đến từ độ chính xác, ảnh linh kiện thật, màu trạng thái nhất quán và nhịp không gian sạch; không đến từ nền lưới, đường đo trang trí hoặc phong cách gaming RGB.

Ba khu vực chia sẻ cùng hệ thống:

- **Buyer:** rộng rãi hơn, ảnh sản phẩm và quyết định mua hàng là trọng tâm.
- **Shop:** mật độ vừa, ưu tiên công việc cần xử lý và trách nhiệm của đúng shop.
- **Admin:** mật độ cao hơn, ưu tiên ngoại lệ, dữ liệu nguồn và audit.

## Nguyên tắc cốt lõi

1. **Quan hệ trước trang trí.** Dùng alignment, khoảng cách, divider và thứ bậc chữ trước khi thêm container hoặc màu.
2. **Một màu, một nghĩa.** Cobalt là hành động/đang chọn; teal là đã xác minh; amber là cần chú ý; red là lỗi hoặc phá hủy.
3. **Sự thật kỹ thuật tách khỏi điều kiện thương mại.** Model, offer, shop, giá, tồn, giao hàng và bảo hành luôn là lớp thông tin độc lập.
4. **Trách nhiệm luôn nhìn thấy.** Đơn cha, đơn con, shipment, payment và case không bị gộp thành một badge chung.
5. **Không dùng độ nhỏ để tạo vẻ chuyên nghiệp.** Nhãn chức năng tối thiểu 12px; nội dung bảng tối thiểu 13px; body mặc định 15px.

## Màu sắc

Canvas lạnh `#F5F7FA` và panel trắng chiếm phần lớn diện tích. Ink `#172033` dùng cho chữ chính; slate `#5C6778` dành cho mô tả vẫn phải đạt tương phản đọc. Border `#DFE5EC` tạo cấu trúc mà không làm trang nặng.

- Primary `#2563EB`: CTA, focus, link active, lựa chọn hiện tại.
- Verified `#0F9F91`: tương thích/đối soát/hoàn thành đã xác nhận.
- Warning `#D97706`: có điều kiện, gần SLA, cần kiểm tra.
- Critical `#DC4255`: không tương thích, thất bại, hành động nguy hiểm.

Mọi màu trạng thái phải đi cùng nhãn chữ. Không dùng màu để thay thế nội dung.

## Typography

Be Vietnam Pro là typeface chính cho toàn bộ sản phẩm để tiếng Việt rõ và tạo cảm giác thống nhất giữa commerce và operations. Saira Semi Condensed chỉ còn là asset dự phòng của prototype cũ; không dùng trong lớp production.

- Display: 44–64px, dùng giới hạn cho hero Buyer.
- Page title: 30–41px.
- Section title: 26–32px.
- Card title: 16–17px.
- Body: 15px, line-height 1.55, measure 65–70ch.
- Label/status: 12px, weight 650; không viết hoa/tracking rộng trừ header bảng hoặc mã phân loại ngắn.
- Giá, tỷ lệ và mã nghiệp vụ dùng tabular numerals khi có thể.

## Bố cục desktop

Prototype hiện tại tập trung desktop web. Container tối đa 1360px, lề ngoài 28px và gutter 16–22px. Topbar cao 74px; service bar cao 34px. Buyer dùng các bố cục 5/4/3, 8/4 hoặc nội dung linh hoạt + summary 370–390px. Shop/Admin dùng sidebar 256px và vùng nội dung có padding 34–38px.

Không dùng command band tối cỡ lớn cho mọi dashboard. Page header vận hành nằm trực tiếp trên canvas để nhường hierarchy cho dữ liệu và task. Bề mặt ink chỉ dùng có chủ đích ở Buyer hero, auth context, service bar và footer.

## Bề mặt và độ sâu

- Panel: góc 14px, border 1px, nền trắng; không vừa border vừa shadow lớn.
- Product card: border ở trạng thái nghỉ; hover nâng 3px và thêm shadow mềm để cho biết có thể mở.
- Sticky summary và hero: có shadow mềm vì thật sự nổi khỏi luồng.
- Button/input: góc 9px; status/count dùng pill.
- Modal: góc 15px, shadow overlay rõ; backdrop tối bán trong suốt.

Không dùng corner calibration, thick top stripe, colored side border, measurement grid, glass decoration hoặc gradient text.

## Thành phần dùng lại

### Navigation

Buyer header gồm logo, search lớn và link theo hành trình. Active link dùng chữ cobalt + underline 2px. Shop/Admin sidebar dùng nền xám rất nhạt, active row nền cobalt soft, không dùng vạch màu trang trí. Service bar chỉ chứa ngữ cảnh hữu ích.

### Buttons

Button cao tối thiểu 42px, label viết thường theo câu và có động từ rõ. Primary cobalt có shadow rất nhẹ; secondary nền trắng; quiet có nền cobalt soft khi hover; danger chỉ cho hành động phá hủy. Focus ring 3px luôn nhìn thấy.

### Form

Input/select cao 44px, label nằm ngoài control. Hover tăng contrast border; focus dùng border cobalt + ring bán trong suốt. Error phải nêu lỗi và cách sửa bằng chữ. Disabled không được trông như placeholder.

### Status và alert

Status là pill nhỏ gồm dot + label; màu tonal, không phải button. Alert dùng dot + nội dung + action, góc 11px. Alert không lồng trong card nếu divider/spacing đã đủ.

### Tables

Header nền `#F8FAFC`, chữ 11px uppercase có tracking nhẹ. Cell 13px, padding 16px và hover xanh rất nhẹ. Mã, actor, payment, order, shipment phải giữ ở cột riêng.

### Product cards và imagery

Packshot dùng `object-fit: contain`, giữ đúng tỷ lệ, không cắt. Product plate nền `#F8FAFC` và không có khung đo trang trí. Card phải thấy model, thông số chính, trạng thái tương thích, giá và CTA trong một lượt quét. Nguồn ảnh lưu tại `prototype/assets/images/products/SOURCES.md`; asset seed phải được rà lại quyền thương mại trước khi phát hành.

### Build slot

Slot đã chọn gồm số thứ tự, thumbnail, nhóm linh kiện, model, shop và giá. Slot trống nêu hành động tiếp theo hoặc ràng buộc còn thiếu. Active dùng background/border tonal, không dùng thanh màu cạnh trên.

### Operations cards

Metric panel cùng chiều cao và chỉ chứa một chỉ số, phạm vi thời gian và diễn giải. Task list được ưu tiên hơn metric khi người dùng phải hành động. Dashboard không dùng bốn hero card để thay thế nội dung.

## Interaction và motion

Motion chính nằm ở hover card/CTA và thay đổi meter, 160–220ms, ease-out. Không áp cùng một entrance animation cho mọi section. `prefers-reduced-motion` tắt transition không thiết yếu. Tab, menu, modal và sidebar preview dùng vanilla JavaScript hiện có; không thêm logic nghiệp vụ.

## Nội dung và trạng thái

Copy là tiếng Việt sản phẩm, không dùng nhãn “prototype”, “demo”, “mô phỏng” trong chrome. Mọi luồng quan trọng cần có real content và đại diện cho loading, empty, error, permission, success, partial success, stale data, destructive confirmation. Thư viện trạng thái là tài liệu tham chiếu; màn hình nghiệp vụ dùng trạng thái phù hợp ngữ cảnh.

## Không làm trong giai đoạn này

- Không triển khai backend, API, database, authentication, payment, shipping hay business logic.
- Không mở rộng thiết kế mobile; desktop là phạm vi xác nhận hiện tại.
- Không bịa testimonial, partner, benchmark, SLA hoặc claim thương mại.
- Không dùng UI gaming/RGB, glassmorphism, nền grid, icon emoji hoặc card lồng card để tạo vẻ “công nghệ”.
