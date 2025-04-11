
import Footer from "../components/Footer"
import "../Css/services.css"
import MainComponent from "../components/MainComponent";
import permitsImg from "../components/images/ChatGPT Image 6 أبريل 2025، 09_52_31 م.png";
import ReverseSection from "../components/ReverseSection";
import elctricImg from "../components/images/تصميم بدون عنوان.png"
import houseImg from "../components/images/وحدة سكنيه.png"
import trafficImg from "../components/images/تصميم بدون عنوان (1) (1).png"

function Services() {
   // الاحوال المدنية
   const certificates = [
    {
      id: "birth",
      category: "civil",
      title: "شهادة ميلاد",
      description: "يمكنك استخراج شهادة ميلاد مميكنة من خلال هذه الخدمة."
    },
    {
      id: "death",
      category: "civil",
      title: "شهادة وفاة",
      description: "خدمة لاستخراج شهادة وفاة موثقة ومعتمدة."
    },
    {
      id: "marriage",
      category: "civil",
      title: "قسيمة زواج",
      description: "خدمة لاستخراج قسيمة زواج مميكنة إلكترونيًا."
    },
    {
      id: "divorce",
      category: "civil",
      title: "قسيمة طلاق",
      description: "خدمة لاستخراج قسيمة طلاق معتمدة من السجل المدني."
    },
    {
      id: "lost-id",
      category: "civil",
      title: "بدل فاقد لبطاقة الرقم القومي",
      description: "تتيح لك هذه الخدمة استخراج بدل فاقد لبطاقتك الشخصية."
    },
    {
      id: "first-birth-cert",
      category: "civil",
      title: "شهادة ميلاد مميكنة لأول مرة",
      description: "خدمة خاصة باستخراج شهادة الميلاد الإلكترونية لأول مرة."
    },
  ];
  // خدمات المرور
  const trafficServices = [
    {
      id: "1",
      category: "traffic",
      title: "استخراج رخصة قيادة",
      description: "هذه الخدمة تتيح لك استخراج رخصة قيادة خاصة أو مهنية لأول مرة بعد اجتياز الشروط والفحوصات اللازمة."
    },
    {
      id: "2",
      category: "traffic",
      title: "تجديد رخصة قيادة",
      description: "يمكنك تجديد رخصة القيادة الخاصة بك بسهولة من خلال هذه الخدمة."
    },
    {
      id: "3",
      category: "traffic",
      title: "استخراج رخصة سيارة",
      description: "خدمة لاستخراج رخصة سيارة جديدة سواء كانت ملاكي أو نقل."
    },
    {
      id: "4",
      category: "traffic",
      title: "تجديد رخصة سيارة",
      description: "خدمة لتجديد رخصة سيارتك الحالية دون الحاجة للذهاب إلى المرور."
    },
    {
      id: "5",
      category: "traffic",
      title: "بدل فاقد / تالف للرخص",
      description: "تساعدك هذه الخدمة على استخراج بدل فاقد أو تالف لرخصة القيادة أو السيارة."
    },
    {
      id: "6",
      category: "traffic",
      title: "مخالفات المرور ودفعها",
      description: "يمكنك الاستعلام عن مخالفات المرور ودفعها أونلاين بسهولة."
    },
  ];
  
  // خدمات صحية
  const healthServices = [
    {
      id: "health-1",
      category: "health",
      title: "استخراج شهادة تطعيم",
      description: "يمكنك استخراج شهادة تطعيم محدثة معتمدة."
    },
    {
      id: "health-2",
      category: "health",
      title: "حجز موعد في وحدة صحية",
      description: "يمكنك حجز موعد في الوحدة الصحية الأقرب إليك."
    },
    {
      id: "health-3",
      category: "health",
      title: "استخراج بطاقة تأمين صحي",
      description: "استخراج بطاقة تأمين صحي للحصول على الخدمات الطبية."
    },
    {
      id: "health-4",
      category: "health",
      title: "بدل فاقد لبطاقة التأمين",
      description: "خدمة لاستبدال بطاقة التأمين الصحي المفقودة."
    },
    {
      id: "health-5",
      category: "health",
      title: "استخراج تقرير طبي معتمد",
      description: "إصدار تقرير طبي معتمد من الهيئة الصحية."
    },
    {
      id: "health-6",
      category: "health",
      title: "تسجيل مولود في الوحدة الصحية",
      description: "خدمة تسجيل مولود جديد في الوحدة الصحية."
    },
  ];
  
  // خدمات التعليم
  const educationServices = [
    {
      id: "education-1",
      category: "education",
      title: "استخراج بيان درجات",
      description: "استخراج بيان درجات من الوزارة المعنية."
    },
    {
      id: "education-2",
      category: "education",
      title: "التقديم لرياض الأطفال",
      description: "إتمام إجراءات التقديم لرياض الأطفال."
    },
    {
      id: "education-3",
      category: "education",
      title: "التقديم للمدارس الحكومية",
      description: "إجراءات التقديم في المدارس الحكومية."
    },
    {
      id: "education-4",
      category: "education",
      title: "استخراج شهادة قيد",
      description: "استخراج شهادة قيد للطلاب."
    },
    {
      id: "education-5",
      category: "education",
      title: "بدل فاقد لشهادة التخرج",
      description: "خدمة استخراج شهادة تخرج بدل فاقد."
    },
    {
      id: "education-6",
      category: "education",
      title: "التحويل بين المدارس",
      description: "خدمة التحويل بين المدارس الحكومية."
    },
  ];
  
  // خدمات التوظيف والتأمينات
  const employmentServices = [
    {
      id: "employment-1",
      category: "employment",
      title: "تسجيل في هيئة التأمينات",
      description: "تسجيلك في هيئة التأمينات الاجتماعية."
    },
    {
      id: "employment-2",
      category: "employment",
      title: "الاستعلام عن الرقم التأميني",
      description: "استعلام عن الرقم التأميني الخاص بك."
    },
    {
      id: "employment-3",
      category: "employment",
      title: "استخراج شهادة مفردات مرتب",
      description: "إصدار شهادة مفردات مرتب من التأمينات."
    },
    {
      id: "employment-4",
      category: "employment",
      title: "التقديم على وظيفة حكومية",
      description: "التقديم للوظائف الحكومية المتاحة."
    },
    {
      id: "employment-5",
      category: "employment",
      title: "تحديث بيانات موظف",
      description: "تحديث بيانات الموظف في الجهات الحكومية."
    },
  ];
  
  // خدمات الإسكان والمرافق
  const housingServices = [
    {
      id: "housing-1",
      category: "housing",
      title: "التقديم على وحدة سكنية",
      description: "خدمة تقديم طلب للحصول على وحدة سكنية."
    },
    {
      id: "housing-2",
      category: "housing",
      title: "الاستعلام عن مشاريع إسكان",
      description: "استعلام عن المشاريع السكنية المتاحة."
    },
    {
      id: "housing-3",
      category: "housing",
      title: "التقديم على عداد كهرباء / مياه",
      description: "التقديم للحصول على عداد كهرباء أو مياه."
    },
    {
      id: "housing-4",
      category: "housing",
      title: "نقل ملكية عداد",
      description: "خدمة نقل ملكية عداد كهرباء أو مياه."
    },
    {
      id: "housing-5",
      category: "housing",
      title: "تقديم شكوى للمرافق",
      description: "خدمة تقديم شكوى لمرافق الكهرباء أو المياه."
    },
  ];
  
  //  خدمات الضرائب والعقارات
  const taxServices = [
    {
      id: "tax-1",
      category: "tax",
      title: "تقديم إقرار ضريبي",
      description: "تقديم إقرار ضريبي للمصلحة العامة."
    },
    {
      id: "tax-2",
      category: "tax",
      title: "استخراج شهادة مخالصة ضريبية",
      description: "استخراج شهادة مخالصة ضريبية لتسوية وضعك الضريبي."
    },
    {
      id: "tax-3",
      category: "tax",
      title: "تسجيل شقة أو أرض",
      description: "تسجيل ملكية شقة أو أرض في السجل العقاري."
    },
    {
      id: "tax-4",
      category: "tax",
      title: "نقل ملكية عقار",
      description: "خدمة نقل ملكية عقار بين الأشخاص."
    },
    {
      id: "tax-5",
      category: "tax",
      title: "الاستعلام عن ضريبة عقارية",
      description: "استعلام عن الضريبة العقارية المستحقة."
    },
  ];
  
  // خدمات الكهرباء والمرافق والفواتير
  const utilityServices = [
    // {
    //   id: "utility-1",
    //   category: "utility",
    //   title: "استعلام عن فاتورة الكهرباء",
    //   description: "استعلم عن فاتورة الكهرباء الخاصة بك."
    // },
    {
      id: "utility-2",
      category: "utility",
      title: "سداد فاتورة الكهرباء",
      description: "سدد فاتورة الكهرباء الخاصة بك بكل سهولة."
    },
    {
      id: "utility-3",
      category: "utility",
      title: "سداد فاتورة المياه",
      description: "سدد فاتورة المياه الخاصة بك."
    },
    // {
    //   id: "utility-4",
    //   category: "utility",
    //   title: "استعلام عن فاتورة الغاز",
    //   description: "استعلام عن فاتورة الغاز الخاصة بك."
    // },
    {
      id: "utility-5",
      category: "utility",
      title: "سداد فاتورة الغاز",
      description: "سدد فاتورة الغاز الخاصة بك."
    },
    {
      id: "utility-6",
      category: "utility",
      title: "تقديم شكوى مرافق",
      description: "خدمة تقديم شكوى بخصوص أي مشكلة في المرافق."
    },
  ];
  return (
    <>
<div id="civil-section"><ReverseSection

title=" الأحوال المدنية"
image={permitsImg}
cardsData={certificates}
/></div>

<div id="utility-section"><MainComponent

title=" خدمات الكهرباء والمرافق والفواتير"
image={elctricImg}
cardsData={utilityServices}
/></div>

<div id="housing-section"><ReverseSection

title=" خدمات الإسكان والمرافق "
image={houseImg}
cardsData={housingServices}
/></div>

<div id="traffic-section"><MainComponent

title=" خدمات المرور"
image={trafficImg}
cardsData={trafficServices}
/></div>
{/* <Footer/> */}
    </>
  )
}

export default Services