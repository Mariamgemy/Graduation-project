// import React, { useState } from "react";

// const Profile = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   // بيانات المستخدم
//   const [user, setUser] = useState({
//     name: "أحمد محمد علي",
//     email: "ahmed.mohamed@example.com",
//     nationalId: "29012345678901",
//     phone: "01012345678",
//     address: "شارع التحرير، وسط البلد، القاهرة",
//     birthDate: "1990-01-15",
//     gender: "ذكر",
//     profileComplete: 85,
//     isVerified: true,
//     memberSince: "2023-01-15"
//   });

//   // الخدمات الحكومية
//   const services = [
//     { id: 1, name: "استخراج شهادة ميلاد", date: "2024-06-15", status: "مكتملة", type: "success" },
//     { id: 2, name: "تجديد الرخصة", date: "2024-06-10", status: "قيد المراجعة", type: "warning" },
//     { id: 3, name: "طلب جواز سفر", date: "2024-06-05", status: "مرفوضة", type: "danger" },
//     { id: 4, name: "دفع الضرائب", date: "2024-05-20", status: "مكتملة", type: "success" }
//   ];

//   // الإشعارات
//   const notifications = [
//     { id: 1, title: "تم قبول طلبك", message: "تم قبول طلب استخراج شهادة الميلاد", date: "منذ ساعتين", isRead: false },
//     { id: 2, title: "تذكير بالدفع", message: "موعد دفع الضرائب يقترب", date: "منذ يوم", isRead: true },
//     { id: 3, title: "تحديث النظام", message: "سيتم تحديث النظام غداً", date: "منذ يومين", isRead: true }
//   ];

//   const handleSaveProfile = () => {
//     setMessage({ text: "تم حفظ التعديلات بنجاح", type: "success" });
//     setShowEditModal(false);
//     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//   };

//   const handleChangePassword = () => {
//     setMessage({ text: "تم تغيير كلمة المرور بنجاح", type: "success" });
//     setShowChangePassword(false);
//     setTimeout(() => setMessage({ text: "", type: "" }), 3000);
//   };

//   const ProfileTab = () => (
//     <div className="profile-card">
//       <div className="profile-header">
//         <div className="profile-avatar">
//           <div className="avatar-circle">
//             {user?.name?.charAt(0)}
//           </div>
//           <div className="verification-badge">
//             {user.isVerified && <span className="verified-icon">✓</span>}
//           </div>
//         </div>
//         <h3 className="user-name">{user.name}</h3>
//         <p className="member-since">عضو منذ {user.memberSince}</p>

//         <div className="profile-completion">
//           <div className="completion-header">
//             <span>اكتمال الملف الشخصي</span>
//             <span className="percentage">{user.profileComplete}%</span>
//           </div>
//           <div className="progress-bar">
//             <div
//               className="progress-fill"
//               style={{width: `${user.profileComplete}%`}}
//             ></div>
//           </div>
//         </div>
//       </div>

//       <div className="user-info">
//         <div className="info-row">
//           <div className="info-item">
//             <span className="label">
//               <span className="icon">📧</span>
//               البريد الإلكتروني
//             </span>
//             <span className="value">{user.email}</span>
//           </div>
//           <div className="info-item">
//             <span className="label">
//               <span className="icon">🆔</span>
//               الرقم القومي
//             </span>
//             <span className="value">{user.nationalId}</span>
//           </div>
//         </div>

//         <div className="info-row">
//           <div className="info-item">
//             <span className="label">
//               <span className="icon">📱</span>
//               رقم الهاتف
//             </span>
//             <span className="value">{user.phone}</span>
//           </div>
//           <div className="info-item">
//             <span className="label">
//               <span className="icon">📅</span>
//               تاريخ الميلاد
//             </span>
//             <span className="value">{user.birthDate}</span>
//           </div>
//         </div>

//         <div className="info-item full-width">
//           <span className="label">
//             <span className="icon">📍</span>
//             العنوان
//           </span>
//           <span className="value">{user.address}</span>
//         </div>
//       </div>

//       <div className="profile-actions">
//         <button
//           className="btn btn-primary"
//           onClick={() => setShowEditModal(true)}
//         >
//           <span className="btn-icon">✏️</span>
//           تعديل البيانات
//         </button>
//         <button
//           className="btn btn-secondary"
//           onClick={() => setShowChangePassword(true)}
//         >
//           <span className="btn-icon">🔒</span>
//           تغيير كلمة المرور
//         </button>
//       </div>
//     </div>
//   );

//   const ServicesTab = () => (
//     <div className="services-card">
//       <div className="card-header">
//         <h4>
//           <span className="header-icon">⚙️</span>
//           الخدمات المستخدمة
//         </h4>
//       </div>
//       <div className="services-list">
//         {services.map(service => (
//           <div key={service.id} className="service-item">
//             <div className="service-content">
//               <div className="service-info">
//                 <h5>{service.name}</h5>
//                 <small className="service-date">{service.date}</small>
//               </div>
//               <span className={`status-badge ${service.type}`}>
//                 {service.status}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const NotificationsTab = () => (
//     <div className="notifications-card">
//       <div className="card-header">
//         <h4>
//           <span className="header-icon">🔔</span>
//           الإشعارات
//         </h4>
//       </div>
//       <div className="notifications-list">
//         {notifications.map(notification => (
//           <div
//             key={notification.id}
//             className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
//           >
//             <div className="notification-content">
//               <div className="notification-info">
//                 <h6>{notification.title}</h6>
//                 <p>{notification.message}</p>
//                 <small>{notification.date}</small>
//               </div>
//               {!notification.isRead && (
//                 <span className="new-badge">جديد</span>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="profile-container">
//       <div className="page-header">
//         <h1>حسابي</h1>
//         <p>إدارة بياناتك الشخصية والخدمات الحكومية</p>
//       </div>

//       {message.text && (
//         <div className={`alert alert-${message.type}`}>
//           <span className="alert-icon">
//             {message.type === 'success' ? (
//               <span role="img" aria-label="نجاح">✅</span>
//             ) : message.type === 'danger' ? (
//               <span role="img" aria-label="خطأ">❌</span>
//             ) : message.type === 'warning' ? (
//               <span role="img" aria-label="تحذير">⚠️</span>
//             ) : null}
//           </span>
//           <span className="alert-text">{message.text}</span>
//         </div>
//       )}

//       {/* أزرار التبديل بين التبويبات */}
//       <div className="tabs">
//         <button
//           className={`tab-btn${activeTab === 'profile' ? ' active' : ''}`}
//           onClick={() => setActiveTab('profile')}
//         >
//           الملف الشخصي
//         </button>
//         <button
//           className={`tab-btn${activeTab === 'services' ? ' active' : ''}`}
//           onClick={() => setActiveTab('services')}
//         >
//           الخدمات
//         </button>
//         <button
//           className={`tab-btn${activeTab === 'notifications' ? ' active' : ''}`}
//           onClick={() => setActiveTab('notifications')}
//         >
//           الإشعارات
//         </button>
//       </div>

//       {/* محتوى التبويبات */}
//       <div className="tab-content">
//         {activeTab === 'profile' && <ProfileTab />}
//         {activeTab === 'services' && <ServicesTab />}
//         {activeTab === 'notifications' && <NotificationsTab />}
//       </div>

//       {/* مودال تعديل البيانات */}
//       {showEditModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>تعديل البيانات الشخصية</h3>
//             {/* هنا يمكنك وضع حقول التعديل */}
//             <div className="modal-actions">
//               <button className="btn btn-primary" onClick={handleSaveProfile}>حفظ</button>
//               <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>إلغاء</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* مودال تغيير كلمة المرور */}
//       {showChangePassword && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>تغيير كلمة المرور</h3>
//             {/* هنا يمكنك وضع حقول كلمة المرور */}
//             <div className="modal-actions">
//               <button className="btn btn-primary" onClick={handleChangePassword}>تغيير</button>
//               <button className="btn btn-secondary" onClick={() => setShowChangePassword(false)}>إلغاء</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { API_CONFIG } from "../api/config";
import "../Css/profile.css";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const { user: authUser, logout } = useAuth();

  // بيانات المستخدم الكاملة (من API + localStorage)
  const [user, setUser] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    nationalId: authUser?.nationalId || "",
    phone: authUser?.phone || "",
    address: authUser?.address || "",
    birthDate: authUser?.birthDate || "",
    gender: authUser?.gender || "",
    profileComplete: 0,
    isVerified: false,
    memberSince: "",
  });

  // الخدمات الحكومية (هنخليها فاضية لحد ما نجيب من API)
  const [services, setServices] = useState([]);

  // الإشعارات (هنخليها فاضية لحد ما نجيب من API)
  const [notifications, setNotifications] = useState([]);

  // جلب بيانات المستخدم من API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser?.token) {
        setIsLoading(false);
        setApiError("لم يتم العثور على معلومات تسجيل الدخول");
        return;
      }

      try {
        setIsLoading(true);
        setApiError("");

        // جلب بيانات المستخدم
        const userResponse = await fetch(`${API_CONFIG.BASE_URL}/Auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("بيانات المستخدم من API:", userData);

          // دمج البيانات من localStorage مع البيانات من API
          setUser((prevUser) => ({
            ...prevUser,
            name: userData.data?.displayName || authUser.name || prevUser.name,
            email: userData.data?.email || authUser.email || prevUser.email,
            nationalId:
              userData.data?.nid || authUser?.nationalId || prevUser.nationalId,
            phone:
              userData.data?.phoneNumber || authUser?.phone || prevUser.phone,
            address:
              userData.data?.address || authUser?.address || prevUser.address,
            birthDate:
              userData.data?.dateOfBirth ||
              authUser?.birthDate ||
              prevUser.birthDate,
            gender:
              userData.data?.gender || authUser?.gender || prevUser.gender,
            profileComplete: calculateProfileCompletion(userData.data),
            isVerified: userData.data?.isVerified || false,
            memberSince: userData.data?.createdAt
              ? new Date(userData.data.createdAt).toLocaleDateString("ar-EG")
              : localStorage.getItem("memberSince")
              ? new Date(
                  localStorage.getItem("memberSince")
                ).toLocaleDateString("ar-EG")
              : "",
          }));
        } else {
          console.warn("فشل في جلب بيانات المستخدم:", userResponse.status);
          // استخدام البيانات من localStorage كـ fallback
          setUser((prevUser) => ({
            ...prevUser,
            name: authUser.name || prevUser.name,
            email: authUser.email || prevUser.email,
            profileComplete: calculateProfileCompletion(authUser),
            memberSince: "undefined ",
          }));
        }

        // جلب الخدمات (اختياري - لو عندك API للخدمات)
        try {
          const servicesResponse = await fetch(
            `${API_CONFIG.BASE_URL}/Services/user-services`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authUser.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (servicesResponse.ok) {
            const servicesData = await servicesResponse.json();
            setServices(servicesData.data || []);
          } else {
            // لو مفيش API للخدمات، هنسيب الليست فاضية
            setServices([]);
          }
        } catch (servicesError) {
          console.log("لم يتم العثور على API الخدمات، سيتم عرض قائمة فارغة");
          setServices([]);
        }

        // جلب الإشعارات (اختياري - لو عندك API للإشعارات)
        try {
          const notificationsResponse = await fetch(
            `${API_CONFIG.BASE_URL}/Notifications/user-notifications`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${authUser.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (notificationsResponse.ok) {
            const notificationsData = await notificationsResponse.json();
            setNotifications(notificationsData.data || []);
          } else {
            setNotifications([]);
          }
        } catch (notificationsError) {
          console.log("لم يتم العثور على API الإشعارات، سيتم عرض قائمة فارغة");
          setNotifications([]);
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        setApiError("حدث خطأ في جلب البيانات. يرجى المحاولة لاحقاً");

        // استخدام البيانات من localStorage كـ fallback
        setUser((prevUser) => ({
          ...prevUser,
          name: authUser.name || prevUser.name,
          email: authUser.email || prevUser.email,
          profileComplete: calculateProfileCompletion(authUser),
          memberSince: "undefined ",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  // حساب نسبة اكتمال الملف الشخصي
  const calculateProfileCompletion = (userData) => {
    if (!userData) return 20; // اسم وإيميل من تسجيل الدخول

    let completed = 0;
    const fields = [
      "displayName",
      "email",
      "nationalId",
      "phoneNumber",
      "address",
      "birthDate",
      "gender",
    ];

    fields.forEach((field) => {
      if (userData[field] && userData[field].trim() !== "") {
        completed += 100 / fields.length;
      }
    });

    return Math.round(completed);
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);

      // هنا هتحطي الـ API call لحفظ التعديلات
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/User/update-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: user.name,
            phoneNumber: user.phone,
            address: user.address,
            birthDate: user.birthDate,
            gender: user.gender,
          }),
        }
      );

      if (response.ok) {
        setMessage({ text: "تم حفظ التعديلات بنجاح", type: "success" });
        setShowEditModal(false);
      } else {
        throw new Error("فشل في حفظ التعديلات");
      }
    } catch (error) {
      console.error("خطأ في حفظ التعديلات:", error);
      setMessage({ text: "حدث خطأ في حفظ التعديلات", type: "danger" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);

      // هنا هتحطي الـ API call لتغيير كلمة المرور
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/Auth/change-password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // هنا هتحطي باقي البيانات المطلوبة للـ API
          }),
        }
      );

      if (response.ok) {
        setMessage({ text: "تم تغيير كلمة المرور بنجاح", type: "success" });
        setShowChangePassword(false);
      } else {
        throw new Error("فشل في تغيير كلمة المرور");
      }
    } catch (error) {
      console.error("خطأ في تغيير كلمة المرور:", error);
      setMessage({ text: "حدث خطأ في تغيير كلمة المرور", type: "danger" });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  // لو المستخدم مش مسجل دخول
  if (!authUser) {
    return (
      <div className="profile-container">
        <div className="alert alert-warning text-center">
          <h4>يجب تسجيل الدخول أولاً</h4>
          <p>يرجى تسجيل الدخول للوصول إلى صفحة الملف الشخصي</p>
        </div>
      </div>
    );
  }

  const ProfileTab = () => (
    <div className="profile-card">
      {isLoading ? (
        <div className="text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
          <p className="mt-2">جاري تحميل البيانات...</p>
        </div>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-circle">
                {user?.name?.charAt(0) || "؟"}
              </div>
              <div className="verification-badge">
                {user.isVerified && <span className="verified-icon">✓</span>}
              </div>
            </div>
            <h3 className="user-name">{user.name || "undefined "}</h3>
            <p className="member-since">
              عضو منذ {user.memberSince || "undefined "}
            </p>

            <div className="profile-completion">
              <div className="completion-header">
                <span>اكتمال الملف الشخصي</span>
                <span className="percentage">{user.profileComplete}%</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${user.profileComplete}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="user-info">
            <div className="info-row">
              <div className="info-item">
                <span className="label">
                  <span className="icon">📧</span>
                  البريد الإلكتروني
                </span>
                <span className="value">{user.email || "غير محدد"}</span>
              </div>
              <div className="info-item">
                <span className="label">
                  <span className="icon">🆔</span>
                  الرقم القومي
                </span>
                <span className="value">{user.nationalId || "غير محدد"}</span>
              </div>
            </div>

            <div className="info-row">
              <div className="info-item">
                <span className="label">
                  <span className="icon">📱</span>
                  رقم الهاتف
                </span>
                <span className="value">{user.phone || "غير محدد"}</span>
              </div>
              <div className="info-item">
                <span className="label">
                  <span className="icon">📅</span>
                  تاريخ الميلاد
                </span>
                <span className="value">{user.birthDate || "غير محدد"}</span>
              </div>
            </div>

            <div className="info-item full-width">
              <span className="label">
                <span className="icon">📍</span>
                العنوان
              </span>
              <span className="value">{user.address || "غير محدد"}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowEditModal(true)}
              disabled={isLoading}
            >
              <span className="btn-icon">✏️</span>
              تعديل البيانات
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowChangePassword(true)}
              disabled={isLoading}
            >
              <span className="btn-icon">🔒</span>
              تغيير كلمة المرور
            </button>
          </div>

          {apiError && (
            <div className="alert alert-warning mt-3">
              <small>{apiError}</small>
            </div>
          )}
        </>
      )}
    </div>
  );

  const ServicesTab = () => (
    <div className="services-card">
      <div className="card-header">
        <h4>
          <span className="header-icon">⚙️</span>
          الخدمات المستخدمة
        </h4>
      </div>
      <div className="services-list">
        {isLoading ? (
          <div className="text-center p-3">
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
            <span className="ms-2">جاري تحميل الخدمات...</span>
          </div>
        ) : services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-content">
                <div className="service-info">
                  <h5>{service.name || service.serviceName}</h5>
                  <small className="service-date">
                    {service.date || service.createdAt
                      ? new Date(
                          service.date || service.createdAt
                        ).toLocaleDateString("ar-EG")
                      : "غير محدد"}
                  </small>
                </div>
                <span
                  className={`status-badge ${getStatusClass(service.status)}`}
                >
                  {service.status || "غير محدد"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted">
            <span className="d-block mb-2">📋</span>
            <p>لم تقم بطلب أي خدمات حتى الآن</p>
            <small>الخدمات التي تطلبها ستظهر هنا</small>
          </div>
        )}
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="notifications-card">
      <div className="card-header">
        <h4>
          <span className="header-icon">🔔</span>
          الإشعارات
        </h4>
      </div>
      <div className="notifications-list">
        {isLoading ? (
          <div className="text-center p-3">
            <div
              className="spinner-border spinner-border-sm"
              role="status"
            ></div>
            <span className="ms-2">جاري تحميل الإشعارات...</span>
          </div>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.isRead ? "unread" : ""
              }`}
            >
              <div className="notification-content">
                <div className="notification-info">
                  <h6>{notification.title}</h6>
                  <p>{notification.message}</p>
                  <small>
                    {notification.date || notification.createdAt
                      ? new Date(
                          notification.date || notification.createdAt
                        ).toLocaleDateString("ar-EG")
                      : "غير محدد"}
                  </small>
                </div>
                {!notification.isRead && (
                  <span className="new-badge">جديد</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-muted">
            <span className="d-block mb-2">🔔</span>
            <p>لا توجد إشعارات حتى الآن</p>
            <small>الإشعارات الجديدة ستظهر هنا</small>
          </div>
        )}
      </div>
    </div>
  );

  // مساعد لتحديد class الحالة
  const getStatusClass = (status) => {
    if (!status) return "secondary";

    switch (status.toLowerCase()) {
      case "مكتملة":
      case "completed":
      case "approved":
        return "success";
      case "قيد المراجعة":
      case "pending":
      case "in_progress":
        return "warning";
      case "مرفوضة":
      case "rejected":
      case "failed":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="profile-container">
      <div className="page-header">
        <h1>حسابي</h1>
        <p>إدارة بياناتك الشخصية والخدمات الحكومية</p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>
          <span className="alert-icon">
            {message.type === "success" ? (
              <span role="img" aria-label="نجاح">
                ✅
              </span>
            ) : message.type === "danger" ? (
              <span role="img" aria-label="خطأ">
                ❌
              </span>
            ) : message.type === "warning" ? (
              <span role="img" aria-label="تحذير">
                ⚠️
              </span>
            ) : null}
          </span>
          <span className="alert-text">{message.text}</span>
        </div>
      )}

      {/* أزرار التبديل بين التبويبات */}
      <div className="tabs">
        <button
          className={`tab-btn${activeTab === "profile" ? " active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          الملف الشخصي
        </button>
        <button
          className={`tab-btn${activeTab === "services" ? " active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          الخدمات
        </button>
        <button
          className={`tab-btn${activeTab === "notifications" ? " active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          الإشعارات
        </button>
      </div>

      {/* محتوى التبويبات */}
      <div className="tab-content">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "services" && <ServicesTab />}
        {activeTab === "notifications" && <NotificationsTab />}
      </div>

      {/* مودال تعديل البيانات */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>تعديل البيانات الشخصية</h3>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">الاسم</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">رقم الهاتف</label>
                <input
                  type="tel"
                  className="form-control"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">العنوان</label>
                <textarea
                  className="form-control"
                  value={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleSaveProfile}
                disabled={isLoading}
              >
                {isLoading ? "جاري الحفظ..." : "حفظ"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditModal(false)}
                disabled={isLoading}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* مودال تغيير كلمة المرور */}
      {showChangePassword && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>تغيير كلمة المرور</h3>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">كلمة المرور الحالية</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">كلمة المرور الجديدة</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">تأكيد كلمة المرور الجديدة</label>
                <input type="password" className="form-control" />
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-primary"
                onClick={handleChangePassword}
                disabled={isLoading}
              >
                {isLoading ? "جاري التغيير..." : "تغيير"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowChangePassword(false)}
                disabled={isLoading}
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
