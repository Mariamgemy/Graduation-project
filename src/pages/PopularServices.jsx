import Footer from "../components/Footer";
import ReverseSection from "../components/ReverseSection";
import popularImg from "../components/images/OBJECTS.svg";

function PopularServices() {
  const popularServices = [
    {
      id: "birth",
      category: "civil",
      title: "شهادة ميلاد",
      description: "يمكنك استخراج شهادة ميلاد مميكنة من خلال هذه الخدمة.",
    },
    {
      id: "lost-id",
      category: "civil",
      title: "بدل فاقد لبطاقة الرقم القومي",
      description: "تتيح لك هذه الخدمة استخراج بدل فاقد لبطاقتك الشخصية.",
    },
    {
      id: "6",
      category: "traffic",
      title: "مخالفات المرور ودفعها",
      description: "يمكنك الاستعلام عن مخالفات المرور ودفعها أونلاين بسهولة.",
    },
    {
      id: "housing-2",
      category: "housing",
      title: "الاستعلام عن مشاريع إسكان",
      description: "استعلام عن المشاريع السكنية المتاحة.",
    },
    {
      id: "utility-2",
      category: "utility",
      title: "سداد فاتورة الكهرباء",
      description: "سدد فاتورة الكهرباء الخاصة بك بكل سهولة.",
    },
    {
      id: "utility-5",
      category: "utility",
      title: "سداد فاتورة الغاز",
      description: "سدد فاتورة الغاز الخاصة بك.",
    },
  ];
  return (
    <>
    <div id="popularServices-section">
      <ReverseSection
        title=" أشهر الخدمات "
        image={popularImg}
        cardsData={popularServices}
      />
    </div>
    <Footer/>
    </>
  );
}

export default PopularServices;
