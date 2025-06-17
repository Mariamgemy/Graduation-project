
import Footer from "../components/Footer"






import "../Css/services.css";
import MainComponent from "../components/MainComponent";
import permitsImg from "../components/images/Printing invoices-amico.svg"
import ReverseSection from "../components/ReverseSection";
import elctricImg from "../components/images/freepik__background__92199.png";

import trafficImg from "../components/images/freepik__background__3598.png";

import phoneImg from "../components/images/phone.png";
import billImg from "../components/images/freepik__background__59718.png"
function Services() {
  //اشهر الخدامات
 
  // الاحوال المدنية
  const certificates = [
    {
      id: "birth",
      category: "civil",
      title: "شهادة ميلاد",
      description: "يمكنك استخراج شهادة ميلاد مميكنة من خلال هذه الخدمة.",
    },
    {
      id: "death",
      category: "civil",
      title: "شهادة وفاة",
      description: "خدمة لاستخراج شهادة وفاة موثقة ومعتمدة.",
    },
    {
      id: "marriage",
      category: "civil",
      title: "قسيمة زواج",
      description: "خدمة لاستخراج قسيمة زواج مميكنة إلكترونيًا.",
    },
    {
      id: "divorce",
      category: "civil",
      title: "قسيمة طلاق",
      description: "خدمة لاستخراج قسيمة طلاق معتمدة من السجل المدني.",
    },
    // {
    //   id: "lost-id",
    //   category: "civil",
    //   title: "بدل فاقد لبطاقة الرقم القومي",
    //   description: "تتيح لك هذه الخدمة استخراج بدل فاقد لبطاقتك الشخصية.",
    // },
    {
      id: "first-birth-cert",
      category: "civil",
      title: "شهادة ميلاد مميكنة لأول مرة",
      description: "خدمة خاصة باستخراج شهادة الميلاد الإلكترونية لأول مرة.",
    },
  ];
  // خدمات المرور
  const trafficServices = [
    // {
    //   id: "traffic-1",
    //   category: "traffic",
    //   title: "استخراج رخصة قيادة",
    //   description:
    //     "هذه الخدمة تتيح لك استخراج رخصة قيادة خاصة أو مهنية لأول مرة بعد اجتياز الشروط والفحوصات اللازمة.",
    // },
    {
      id: "traffic-2",
      category: "traffic",
      title: "تجديد رخصة قيادة",
      description:
        "يمكنك تجديد رخصة القيادة الخاصة بك بسهولة من خلال هذه الخدمة.",
    },
    // {
    //   id: "traffic-3",
    //   category: "traffic",
    //   title: "استخراج رخصة سيارة",
    //   description: "خدمة لاستخراج رخصة سيارة جديدة سواء كانت ملاكي أو نقل.",
    // },
    {
      id: "traffic-4",
      category: "traffic",
      title: "تجديد رخصة سيارة",
      description:
        "خدمة لتجديد رخصة سيارتك الحالية دون الحاجة للذهاب إلى المرور.",
    },
    {
      id: "traffic-5",
      category: "traffic",
      title: "بدل فاقد / تالف للرخص",
      description:
        "تساعدك هذه الخدمة على استخراج بدل فاقد أو تالف لرخصة القيادة أو السيارة.",
    },
    {
      id: "traffic-6",
      category: "traffic",
      title: "مخالفات المرور ودفعها",
      description: "يمكنك الاستعلام عن مخالفات المرور ودفعها أونلاين بسهولة.",
    },
  ];

  // خدمات الكهرباء والمرافق
  const housingServices = [
    {
      id: "energy-certificate",
      category: "housing",
      title: "شهادة كفاءة الطاقة",
      description:
        "خدمة إصدار شهادة معتمدة توضح مدى كفاءة استهلاك الطاقة للعقارات أو الوحدات السكنية، لدعم جهود ترشيد الطاقة.",
    },
  
    {
      id: "housing-3",
      category: "housing",
      title: "التقديم على عداد كهرباء / مياه",
      description:
        "خدمة إلكترونية تتيح لك تقديم طلب للحصول على عداد كهرباء أو مياه جديد بطريقة سهلة وسريعة.",
    },
    {
      id: "housing-4",
      category: "housing",
      title: "نقل ملكية عداد",
      description:
        "خدمة نقل ملكية عداد الكهرباء أو المياه من شخص إلى آخر بشكل رسمي، مع تحديث كافة بيانات المشترك.",
    },
    {
      id: "housing-5",
      category: "housing",
      title: "تقديم شكوى مرافق",
      description:
        "خدمة تتيح لك تقديم شكوى رسمية بخصوص مشكلات المرافق مثل أعطال العدادات أو تسربات المياه والكهرباء.",
    },
  ];

  // سداد الفواتير
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
      description: "سدد فاتورة الكهرباء الخاصة بك بكل سهولة.",
    },
    {
      id: "utility-3",
      category: "utility",
      title: "سداد فاتورة المياه",
      description: "سدد فاتورة المياه الخاصة بك.",
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
      description: "سدد فاتورة الغاز الخاصة بك.",
    },
    {
      id: "utility-6",
      category: "utility",
      title: "متابعة استهلاك الكهرباء بشكل لحظي",
      description:
        "خدمة تمكّنك من متابعة استهلاكك الشهري واليومي للمياه والكهرباء عبر تقارير ورسوم بيانية تفصيلية، مع إشعارات في حال ارتفاع الاستهلاك.",
    },
  ];
  

  return (
    <>
      <div id="civil-section">
        <MainComponent
          title=" الأحوال المدنية"
          image={permitsImg}
          cardsData={certificates}
        />
      </div>
     
      <div id="housing-section">
        <ReverseSection
          title=" خدمات الطاقة والمرافق "
          image={elctricImg}
          cardsData={housingServices}
        />
      </div>

      <div id="traffic-section">
        <MainComponent
          title=" خدمات المرور"
          image={trafficImg}
          cardsData={trafficServices}
        />
      </div>
      <div id="utility-section">
        <ReverseSection
          title=" سداد الفواتير"
          image={billImg}
          cardsData={utilityServices}
        />
      </div>


  
      <Footer />
    </>
  );
}
export default Services;

