import React from "react";
import { useAuth } from "../context/AuthContext";

const UserInfoDisplay = () => {
  const { user } = useAuth();

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <p>
          <strong>بيانات مقدم الطلب:</strong>
        </p>
        <p>
          <strong>الاسم:</strong> {user?.name || "غير متوفر"}
        </p>
        <p>
          <strong>الرقم القومي:</strong> {user?.nationalId || "غير متوفر"}
        </p>
        <p>
          <strong>رقم الهاتف:</strong> {user?.phone || "غير متوفر"}
        </p>
        <p>
          <strong>البريد الالكتروني:</strong> {user?.email || "غير متوفر"}
        </p>
        <hr />
      </div>
    </div>
  );
};

export default UserInfoDisplay;

// UserProfile.jsx - مكون لعرض بيانات المستخدم
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// const UserInfoDisplay = () => {
//   const { 
//     user, 
//     userName, 
//     userEmail, 
//     userPhone, 
//     userAddress, 
//     userNID, 
//     userGovernorate,
//     getUserData 
//   } = useAuth();

//   if (!user) {
//     return (
//       <div className="container mt-4">
//         <div className="alert alert-warning">
//           يرجى تسجيل الدخول لعرض البيانات
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-8 mx-auto">
//           <div className="card">
//             <div className="card-header">
//               <h4>بيانات المستخدم</h4>
//             </div>
//             <div className="card-body">
//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>الاسم:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userName || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>البريد الإلكتروني:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userEmail || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>رقم الهاتف:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userPhone || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>الرقم القومي:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userNID || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>العنوان:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userAddress || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>المحافظة:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {userGovernorate || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>الحالة:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {getUserData('status') || 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>النوع:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {getUserData('gender') === 'Male' ? 'ذكر' : 
//                    getUserData('gender') === 'Female' ? 'أنثى' : 'غير محدد'}
//                 </div>
//               </div>

//               <div className="row mb-3">
//                 <div className="col-sm-4">
//                   <strong>تاريخ الميلاد:</strong>
//                 </div>
//                 <div className="col-sm-8">
//                   {getUserData('dateOfBirth') || 'غير محدد'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfoDisplay;