import { IoSearch } from "react-icons/io5";
import "./welcomePage.css";
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import rafikiImg from "../images/rafiki.svg";
import MainComponent from "../MainComponent";
import permitsImg from "../images/ChatGPT Image 6 أبريل 2025، 09_52_31 م.png";
import ReverseSection from "../ReverseSection";
import elctricImg from "../images/تصميم بدون عنوان.png"
import houseImg from "../images/وحدة سكنيه.png"
import trafficImg from "../images/تصميم بدون عنوان (1) (1).png"
import Footer from "../Footer";
import phoneImg from "../images/phone.png"

function WelcomePage() {
  //اشهر الخدامات
  const services = [
    {
      icon: "🏠",
      title: "خدمات الاسكان ",
      scrollTarget: "housing-section",
    },
    {
      icon: "📑",
      title: "الأحوال المدنية",
      scrollTarget: "civil-section",
    },
    {
      icon: "🧾",
      title: "خدمات الكهرباء",
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
  const caption =[
    {title : "  إحنا قربنا لك كل شيء تحتاجه! استخدم نظام الادارة الذكية من جهازك الذكي أو المحمول وادفع بالطريقة التي تريحك، تقدر تحصل على جميع الخدمات الحكومية بكل سهولة وفي أي وقت وأنت في مكانك تابعنا علشان تظل على اطلاع بأحدث الخدمات الحكومية التي سيتم إضافتها للموقع، ولا تنسى تحميل تطبيق الخدمات الحكومية.."
     , scrollTarget:"mn"
    }
  ]
  
  return (
    <>
     <MainComponent
  title=" الخدمات المتاحة "
  image={rafikiImg}
  cardsData={services}
/>

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

<ReverseSection
  image={phoneImg}
  title="نبذة عننا"
  cardsData={caption}

/>
      <Footer/>
    </>
  );
}
export default WelcomePage;
