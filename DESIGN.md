---
name: PCMatch Configurator Telemetry
description: Hệ giao diện kỹ thuật sáng, biến cấu hình PC, tương thích, ngân sách và trách nhiệm shop thành một bảng đo dễ truy vết.
colors:
  cobalt-signal: "#135FD2"
  cobalt-deep: "#0B3A86"
  cobalt-soft: "#EEF4FF"
  teal-verified: "#05877E"
  teal-deep: "#075F59"
  teal-soft: "#EFFAF9"
  amber-conditional: "#C87500"
  amber-deep: "#7A4600"
  amber-soft: "#FFF7E8"
  red-critical: "#C63B4B"
  red-deep: "#8F2533"
  red-soft: "#FFF0F2"
  ink-graphite: "#15202B"
  slate-reading: "#566370"
  canvas-cool: "#F2F5F6"
  surface-white: "#FFFFFF"
  border-instrument: "#CCD6DC"
  surface-muted: "#E7EDF0"
  surface-muted-strong: "#D5DFE4"
typography:
  display:
    fontFamily: "Saira Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3rem, 6vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Saira Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 4.2vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Saira Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "normal"
  body:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Be Vietnam Pro, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.075em"
rounded:
  sharp: "0"
  control: "2px"
  panel: "4px"
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
    backgroundColor: "{colors.cobalt-signal}"
    textColor: "{colors.surface-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.cobalt-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "40px"
  panel:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-graphite}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.ink-graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "11px 13px"
    height: "48px"
---

# Design System: PCMatch Configurator Telemetry

## Overview

**Creative North Star: "Bàn đo cấu hình đang hoạt động"**

PCMatch trông như một configurator kỹ thuật đáng tin cậy đang chạy, không như một trang bán lẻ phủ lớp gaming. Mỗi bề mặt làm rõ quan hệ giữa lựa chọn linh kiện, kết quả tương thích, ngân sách và bên chịu trách nhiệm. Thẩm mỹ đến từ nhịp đo, cấu trúc, số liệu và trạng thái chính xác; không đến từ ánh sáng RGB, kính mờ hay gradient trang trí.

Hệ thống dùng nền sáng để Buyer, Shop và Admin đọc được thông tin dày trong điều kiện làm việc thông thường. Buyer có khoảng thở và chỉ số lớn hơn; Shop và Admin tăng mật độ, mở mỗi workflow bằng một command band màu ink và dùng panel telemetry đảo màu để tạo điểm tập trung. Phần còn lại giữ panel trắng, rail ngang, nhãn chữ hoa nhỏ, số đo cô đọng và status có ý nghĩa.

**Key Characteristics:**

- Bảng đo sáng, sắc nét, phẳng và có cấu trúc 12 cột.
- Lưới đo 32px rất nhẹ phủ canvas; command band màu ink tạo đỉnh hierarchy cho màn hình vận hành.
- Chỉ số lớn luôn đi cùng nhãn, đơn vị và câu giải thích ngắn.
- Cobalt dành cho hành động và trạng thái đang chọn; teal dành cho bằng chứng đã xác nhận.
- Amber và đỏ chỉ xuất hiện khi có điều kiện, lỗi hoặc hành động cần chú ý.
- Signal rail ngang liên kết các vùng có quan hệ mà không thay thế tiêu đề hoặc nhãn.

## Colors

Bảng màu mang tính công cụ: nền trung tính chiếm phần lớn diện tích; màu chỉ nổi lên khi thể hiện hành động, trạng thái hoặc bằng chứng.

### Primary

- **Cobalt Signal:** hành động chính, focus ring, liên kết active, meter và signal rail đang được người dùng chọn.
- **Cobalt Deep:** trạng thái hover/active và chữ trên nền cobalt nhạt.
- **Cobalt Soft:** nền chọn nhẹ cho row, navigation, thông báo thông tin và bề mặt hover.

### Secondary

- **Teal Verified:** tương thích đã kiểm tra, dữ liệu đã đối chiếu và bước đã hoàn tất; không dùng như màu CTA cạnh tranh với cobalt.
- **Teal Deep / Soft:** cặp chữ–nền cho trạng thái verified có độ tương phản nhẹ hơn hành động chính.

### Tertiary

- **Amber Conditional:** dữ liệu có điều kiện, vượt ngưỡng, sắp hết hạn hoặc cần xác nhận.
- **Amber Deep / Soft:** cặp chữ–nền cho cảnh báo và trạng thái conditional.
- **Red Critical:** không tương thích, thất bại và hành động phá hủy.
- **Red Deep / Soft:** cặp chữ–nền cho lỗi và cảnh báo nghiêm trọng.

### Neutral

- **Ink Graphite:** chữ chính, số đo và đường viền có trọng lượng cao.
- **Slate Reading:** mô tả, metadata và nhãn phụ vẫn phải đạt tương phản đọc được.
- **Cool Canvas:** nền trang và nền đầu bảng, tách panel mà không cần shadow dày.
- **Surface White:** panel, field và vùng tương tác chính.
- **Instrument Border:** đường đo, separator và khung control 1px.
- **Muted Surface / Muted Strong:** vùng disabled, skeleton, track và row chưa active.

**The Signal Ownership Rule.** Cobalt chỉ nói “có thể thao tác/đang thao tác”; teal chỉ nói “đã xác nhận”. Không đảo hai nghĩa này.

**The Status Redundancy Rule.** Mọi màu trạng thái phải đi cùng nhãn chữ và một dấu hiệu hình học, icon hoặc cấu trúc vị trí.

## Typography

**Display Font:** Saira Semi Condensed (với Arial Narrow dự phòng)

**Body Font:** Be Vietnam Pro (với Arial dự phòng)

**Metric Font:** Saira Semi Condensed, dùng chữ số tabular khi có thể

**Character:** Saira tạo dáng kỹ thuật hẹp cho heading và số đo mà không giả lập terminal; Be Vietnam Pro giữ tiếng Việt rõ ở mật độ cao. Cặp chữ phân biệt “đo/điều khiển” với “giải thích/đọc”.

### Hierarchy

- **Display** (700, `clamp(3rem, 6vw, 6rem)`, 0.9): tuyên bố mở đầu; trên mobile co theo viewport nhưng không nhỏ hơn 2.8rem.
- **Headline** (700, `clamp(2.25rem, 4.2vw, 4rem)`, 1): tiêu đề trang và nhóm workflow.
- **Title** (650, 1.375rem, 1.15): tên panel, card và đối tượng nghiệp vụ.
- **Body** (400, 1rem, 1.6): nội dung chính; đoạn dài giới hạn khoảng 70–72ch.
- **Label** (700, 0.6875rem, tracking 0.075em): tên chỉ số, trạng thái và metadata; thường viết hoa, không dùng cho câu dài.

**The Metric Pair Rule.** Một số đo lớn luôn có nhãn, đơn vị hoặc denominator, và ngữ cảnh thời điểm/phạm vi bên cạnh.

## Layout

Desktop dùng container tối đa 1480px, lề ngoài 16px và lưới 12 cột với gutter 16px. First viewport Buyer dùng bố cục 4/5/3; các task chính dùng 8/4 hoặc một vùng nội dung linh hoạt cạnh summary 350–380px. Shop và Admin dùng sidebar 248px cộng vùng nội dung linh hoạt; page head trực tiếp của shell trở thành command band tối cao tối thiểu 210px. Dashboard metric dùng nhịp 3/2/2/5 cột để tránh bốn card đồng hạng. Nhịp khoảng cách được triển khai theo thang 4/8/12/16/20/24/32/40/48/64/72px.

Dưới 1200px, intro Buyer chiếm toàn hàng và manifest/telemetry chuyển thành 8/4; lưới card giảm cột, metric dashboard về 2 cột. Navigation header thu gọn ở 1100px. Dưới 900px, các shell Shop/Admin về một cột và sidebar trở thành drawer; sticky summary trở lại luồng trang. Dưới 768px, Buyer về một cột, telemetry và metric dashboard giữ lưới hai cột khi đủ chỗ, action xếp dọc hoặc thành lưới hai nút, lề ngoài còn 12px và bottom navigation năm mục xuất hiện. Bảng dữ liệu và bảng so sánh trở thành vùng cuộn ngang có chủ đích, không bỏ cột nghiệp vụ.

Topbar cao 72px ở desktop và 62px ở mobile. Panel chính dùng padding 20–24px; mobile giảm panel padded về 16px. Nội dung cuối trang Buyer chừa 88px để bottom navigation không che focus target.

**The Relationship Before Decoration Rule.** Dùng alignment, rail, divider và khoảng cách để thể hiện quan hệ trước khi thêm màu, icon hoặc container mới.

## Elevation & Depth

Hệ thống phẳng theo mặc định. Tầng được tạo bởi canvas lạnh, panel trắng, đường viền 1px và thanh tín hiệu ở cạnh trên. Shadow chỉ xuất hiện khi một bề mặt thực sự nổi khỏi luồng: dropdown/menu dùng `0 8px 24px rgba(21, 32, 43, 0.12)`; modal và drawer dùng `0 20px 60px rgba(21, 32, 43, 0.18)`. Hover không làm card bay lên.

**The Flat-at-Rest Rule.** Card và panel đứng yên không dùng shadow; trạng thái tương tác thể hiện bằng border, màu nền hoặc signal rail.

## Shapes

Hình học gần vuông và có thứ bậc rõ: panel dùng góc 4px; button, input, build slot và skeleton line dùng góc 2px; bảng, rail và icon button có thể vuông hoàn toàn. Status dùng pill 999px vì hình dáng giúp phân biệt metadata với control. Logo mark, dot trạng thái và vạch ngang 2–3px là các dấu hiệu lặp lại; không dùng blob hoặc clip-path trang trí.

**The Shape Hierarchy Rule.** Pill chỉ dành cho trạng thái hoặc số đếm nhỏ; hành động và container luôn giữ cạnh kỹ thuật 0–4px.

## Product Imagery

Ảnh linh kiện dùng packshot thật trên nền trung tính, ưu tiên asset từ hãng và tài liệu kỹ thuật chính thức. Card catalog đặt sản phẩm trong một `product plate` có khung đo, tên dòng sản phẩm và metadata socket/công suất; ảnh luôn dùng `object-fit: contain`, giữ đúng tỷ lệ và không cắt mất chi tiết nhận diện. Trang model tăng kích thước packshot nhưng vẫn dành vùng riêng cho mã model và thông số cốt lõi. Build slot và dòng đơn hàng dùng thumbnail 52–58px để giúp quét nhanh, không thay thế tên model, shop hoặc giá.

Ảnh nền trắng có thể dùng `mix-blend-mode: multiply` trên bề mặt sáng để hòa vào canvas; ảnh có alpha giữ nền trong suốt. SSD và asset vốn có nền đen dùng biến thể thumbnail tối riêng, không ép blend gây mất chi tiết. Mọi asset tải về phải được lưu cục bộ, có kích thước nội tại để tránh layout shift và ghi nguồn tại `prototype/assets/images/products/SOURCES.md`.

**The Product Truth Rule.** Ảnh phải khớp đúng model hoặc đúng family đã ghi rõ; không dùng hình linh kiện khác chỉ vì bố cục đẹp hơn. Ảnh seed phục vụ kiểm tra UI phải được thay bằng media có quyền sử dụng thương mại trước khi phát hành công khai.

## Components

### Buttons

- **Primary:** nền cobalt, chữ trắng, cao tối thiểu 48px, padding ngang 20px; label 0.6875rem viết hoa và có động từ rõ.
- **Secondary:** nền trắng, viền instrument, chữ graphite; cùng chiều cao và nhịp với primary.
- **Quiet:** nền trong suốt, cao 40px, chữ cobalt deep; dùng cho hành động phụ trong alert hoặc cụm action.
- **Hover / Focus / Active:** primary chuyển cobalt deep; secondary chuyển nền cobalt soft và viền cobalt; focus ring cobalt 3px có offset; active nén xuống 1px. Chuyển trạng thái dùng signal easing 160ms.
- **Danger / Disabled:** danger dùng red critical; disabled dùng muted strong/muted, chữ slate và không dịch chuyển.

### Chips

- **Status:** pill trắng có viền, chấm tròn và label chữ; các biến thể info, verified, conditional và critical dùng cặp nền soft + chữ deep tương ứng.
- **Count:** pill nhỏ trên sidebar, nền muted và số căn giữa.

### Cards / Containers

- **Panel:** nền trắng trên canvas lạnh, viền instrument 1px, góc 4px; padding chuẩn 24px và giảm còn 16px trên mobile.
- **Command band:** bề mặt ink chỉ dành cho page head trực tiếp của Shop/Admin; có rail cobalt–teal ở đáy, vạch đo dọc nhẹ và action vẫn đọc rõ trên nền tối.
- **Inverted telemetry:** một panel ink trong rail bên phải làm điểm tập trung cho KPI vận hành; telemetry con dùng nền trắng 5.5%, viền trắng 16% và vẫn giữ màu signal có nghĩa.
- **Corner calibration:** panel có dấu góc 13px bằng hairline cobalt để nhắc lại ngôn ngữ đo mà không thêm shadow hay icon trang trí.
- **Active panel:** border cobalt 1px và signal rail ngang 3px ở cạnh trên; không dùng glow hoặc viền dọc dày.
- **Product / offer card:** giữ model chuẩn, shop, giá, tồn, bảo hành và cập nhật gần nhất thành các lớp đọc riêng.
- **Data table:** header dùng ink và label trắng 72%; row tách bằng muted divider, hover chuyển cobalt soft rất nhẹ.

### Inputs / Fields

- **Field:** cao tối thiểu 48px, nền trắng, viền instrument, góc 2px và label ở ngoài field. Search trong topbar cao 48px, nền trắng 88% và có rail cobalt inset khi focus.
- **Focus:** border cobalt cùng ring cobalt 3px bán trong suốt.
- **Error / Disabled:** error dùng chữ red deep và thông điệp bằng lời; disabled dùng muted surface nhưng nội dung vẫn đọc được.

### Navigation

- **Buyer header:** logo + search lớn + link chữ; active item dùng underline cobalt 3px. Ở mobile, search xuống hàng riêng và menu chuyển thành nút 44px.
- **Shop / Admin sidebar:** brand block dùng ink; nhóm theo workflow; active row dùng nền cobalt, chữ trắng và underline teal 2px.
- **Mobile Buyer:** bottom navigation cố định năm mục, cao tối thiểu 68px; mục active dùng cobalt soft/deep.
- **Service bar:** dải ink 36px ở đầu mỗi surface thay cho banner prototype; nội dung chỉ nêu ngữ cảnh dữ liệu, workspace hoặc nguyên tắc sản phẩm có ích cho người dùng.
- **Buyer footer:** bề mặt ink có rail cobalt–teal, gom điều hướng sản phẩm, tài khoản và nguyên tắc minh bạch dữ liệu; không lặp CTA chính của trang.

### Alerts

Alert dùng lưới signal dot + nội dung + action. Info, conditional và critical đều dùng nền soft, viền tonal và chữ deep; thông báo không dựa vào màu để truyền đạt mức độ hoặc hành động cần làm.

### Telemetry Strip

Một chỉ số gồm nhãn chỉ số, số/giá trị chính, đơn vị hoặc denominator, meter 5px và một câu diễn giải. Card cao tối thiểu 126px ở desktop, có signal rail 3px thể hiện tỷ lệ hoặc trạng thái; không dùng gauge tròn chỉ để trang trí. Command rail có một lần reveal 520ms theo exponential ease-out; thay đổi meter chạy 160ms và mọi chuyển động tôn trọng `prefers-reduced-motion`.

### Build Slot

Mỗi slot cao tối thiểu 68px; slot đã chọn có thể tăng lên 82px để chứa thumbnail thật 58×54px. Cấu trúc gồm mã thứ tự, ảnh nhận diện, nhóm linh kiện, model/offer hiện tại, shop, giá hoặc status. Slot active dùng nền cobalt soft, border cobalt và rail ngang 3px; slot trống không giả thumbnail mà nêu hành động chọn và ràng buộc còn thiếu.

## Do's and Don'ts

### Do:

- **Do** giữ model chuẩn và offer shop thành hai lớp thông tin nhìn thấy được.
- **Do** dùng một scenario dữ liệu xuyên suốt để mọi tổng tiền, shop, trạng thái và mã đối tượng khớp nhau.
- **Do** để chỉ số, cảnh báo và hành động cùng xuất hiện tại điểm ra quyết định.
- **Do** giữ bảng mobile trong vùng cuộn ngang có chủ đích khi việc chuyển thành card sẽ làm mất quan hệ cột.
- **Do** để khoảng trắng, divider và rail ngang tạo hierarchy trước khi thêm card mới.
- **Do** dùng tabular numerals cho giá, công suất, tỷ lệ và mã cần quét nhanh.
- **Do** viết copy như sản phẩm đang vận hành: nhãn hành động trực tiếp, trạng thái có lối thoát, không để ngôn ngữ QA xuất hiện trên surface người dùng.

### Don't:

- **Don't** dùng gradient neon, glow RGB, glassmorphism hoặc nền tối chỉ vì sản phẩm liên quan PC.
- **Don't** lồng card trong card khi divider hoặc spacing đã đủ.
- **Don't** dùng icon tile chung chung thay cho nội dung linh kiện, dữ liệu hoặc trạng thái thật.
- **Don't** gắn nhãn “tốt nhất” dựa riêng vào giá rẻ nhất.
- **Don't** mô tả dữ liệu minh họa như cam kết thương mại, benchmark thật hoặc tích hợp đang hoạt động.
- **Don't** để các nhãn “prototype”, “mô phỏng”, “demo” hoặc cảnh báo dành cho nhóm phát triển xuất hiện trong chrome sản phẩm chính thức.
