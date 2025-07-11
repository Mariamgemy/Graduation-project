import "./welcomePage.css";
import React from "react";
import rafikiImg from "../images/panaa.svg";
import MainComponent from "../MainComponent";
import permitsImg from "../images/Printing invoices-amico.svg"
import ReverseSection from "../ReverseSection";
import captionImg from "../images/services.svg"
import trafficImg from "../images/freepik__background__3598.png";
import Footer from "../Footer";

import billImg from "../images/freepik__background__59718.png"

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginCard from "../../pages/LoginCard";

function WelcomePage() {
  //اشهر الخدامات
  const services = [
    // {
    //   icon: "💡",
    //   title: "خدمات الطاقة والمرافق ",
    //   scrollTarget: "housing-section",
    // },
    {
      icon: "📑",
      title: "الأحوال المدنية",
      scrollTarget: "civil-section",
    },
    {
      icon: "🧾",
      title: "سداد الفواتير",
      scrollTarget: "utility-section",
    },
    {
      icon: "🚦",
      title: "خدمات المرور ",
      scrollTarget: "traffic-section",
    },
  ];
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
    // {
    //   id: "first-birth-cert",
    //   category: "civil",
    //   title: "شهادة ميلاد مميكنة لأول مرة",
    //   description: "خدمة خاصة باستخراج شهادة الميلاد الإلكترونية لأول مرة.",
    // },
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
    {
      id: "traffic-3",
      category: "traffic",
      title: "طلب رخصة إلكترونية",
      description: "خدمة لاستخراج رخصة سيارة جديدة سواء كانت ملاكي أو نقل.",
    },
    // {
    //   id: "traffic-4",
    //   category: "traffic",
    //   title: "تجديد رخصة مركبة",
    //   description:
    //    "تتيح لك هذه الخدمة تجديد رخصة مركبتك إلكترونيًا مع إمكانية توصيل الرخصة إلى عنوانك، بشرط عدم وجود فحص فني أو حظر بيع على المركبة المُراد تجديدها.",
    // },
    {
      id: "traffic-5",
      category: "traffic",
      title: "بدل فاقد / تالف للرخص",
      description:
        "تساعدك هذه الخدمة على استخراج بدل فاقد أو تالف لرخصة القيادة أو السيارة.",
    },
    // {
    //   id: "traffic-6",
    //   category: "traffic",
    //   title: "مخالفات المرور ودفعها",
    //   description: "يمكنك الاستعلام عن مخالفات المرور ودفعها أونلاين بسهولة.",
    // },
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
      title: "تحليل استهلاك الكهرباء",
      description:
       "نظام ذكي يُحلّل بيانات استهلاك الكهرباء ويقدّم توصيات مخصصة للمستخدمين بهدف ترشيد الاستهلاك وتقليل الفواتير.",
    },
  ];
  const caption = [
    {
      title:
        "  إحنا قربنا لك كل شيء تحتاجه! استخدم نظام الادارة الذكية من جهازك الذكي أو المحمول وادفع بالطريقة التي تريحك، تقدر تحصل على جميع الخدمات الحكومية بكل سهولة وفي أي وقت وأنت في مكانك تابعنا علشان تظل على اطلاع بأحدث الخدمات الحكومية التي سيتم إضافتها للموقع، ولا تنسى تحميل تطبيق الخدمات الحكومية..",
      scrollTarget: "mn",
    },
  ];
  const location = useLocation(); // بيجيب state اللي جاي مع Navigate
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (location.state?.showLogin) {
      setShowLoginModal(true); // لما showLogin تبقى true نفتح المودال
    }
  }, [location.state]);

  return (
    <>
     {/* <LoginCard show={showLoginModal} handleClose={() => setShowLoginModal(false)} /> */}
      <MainComponent
        title=" الخدمات المتاحة "
        image={rafikiImg}
        cardsData={services}
      />

      {/* <div id="housing-section">
        <ReverseSection
          title=" خدمات الطاقة والمرافق "
          image={elctricImg}
          cardsData={housingServices}
        />
      </div> */}
      <div id="civil-section">
        <ReverseSection

          title=" الأحوال المدنية"
          image={permitsImg}
          cardsData={certificates}
        />
      </div>
      <div id="utility-section">
      <MainComponent
          title=" سداد الفواتير"
          image={billImg}
          cardsData={utilityServices}
        />
      </div>

      <div id="traffic-section">
      <ReverseSection

          title=" خدمات المرور"
          image={trafficImg}
          cardsData={trafficServices}
        />
      </div>

      <ReverseSection

 image={captionImg} title="نبذة عننا" cardsData={caption} />
     
      <Footer />
    </>
  );
}
export default WelcomePage;