# خريطة التنفيذ الحالية

## الملف الرئيسي

[../index.html](../index.html)

الملف يحتوي على:

- HTML دلالي.
- CSS inline لنظام التصميم.
- JavaScript inline للبيانات والتفاعل.

## وحدات السلوك

| الوظيفة | التنفيذ الحالي |
|---|---|
| اللغة | كائن `translations` مع `ar` و`en` |
| البيانات | كائن `data` للخدمات والقطاعات والحالات والرؤى |
| التنقل | روابط hash إلى الأقسام |
| الهاتف | `nav__menu` و`navLinks` |
| الخدمات | `service-trigger` و`service-detail` |
| الحالات والرؤى | `detailModal` |
| الرؤى | `data-filter` و`renderInsights` |
| النموذج | `consultationForm` و`validateForm` |
| الحركة | `IntersectionObserver` و`reveal` |
| الوصول | labels، live regions، focus-visible، dialog أصلي |

## التحقق المنفذ

- `get_errors` على `index.html`: لا أخطاء.
- اختبار desktop: التنقل الثماني ظاهر، العنوان ظاهر، ولا يوجد overflow.
- اختبار mobile عند 390px: لا يوجد overflow، القائمة والعنوان ظاهران.
- اختبار اللغة: تغير النص والاتجاه إلى LTR.
- اختبار النموذج: رفض الحقول الناقصة ثم نجاح الإرسال عند اكتمالها.
- اختبار الخدمة: فتح وإغلاق التفاصيل.
- اختبار الحالة: فتح dialog.
- اختبار الرؤى: تغيير الفلتر وإظهار نتيجة مطابقة.
