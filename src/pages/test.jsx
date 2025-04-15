 {/* <div className="mb-3">
            <label htmlFor="plateType" className="form-label">
              سنة المخالفة *
            </label>
            <select
              className="form-select  custom-select-style"
              id="plateType"
              value={plateType}
              onChange={(e) => setPlateType(e.target.value)}
            >
              <option value="">يرجى الاختيار</option>
            
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
            
            </select>
          </div> */}
 {/* <p className="text-clor  mb-3">
          يمكنك الاستفسار بالرقم المروري أو رقم الرخصة أو رقم السيارة أو رقم
          المخالفة.
        </p>
        <p className="text-clor mb-4">
          عند الاستفسار برقم المخالفة يجب تحديد مصدر المخالفة.
        </p> */}



        const [formData, setFormData] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      
        const [errors, setErrors] = useState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        const [flag, setFlag] = useState(false);
      
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
      
        const validateName = (name) => {
          return name.length > 1;
        };
        const validateEmail = (email) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        };
      
        const validatePassword = (password) => {
          return password.length >= 8;
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          let newErrors = {};
      
          // التحقق من صحة البريد الإلكتروني
          if (!validateName(formData.name)) {
            newErrors.name = "يرجى إدخال أسم صحيح";
          }
          // التحقق من صحة البريد الإلكتروني
          if (!validateEmail(formData.email)) {
            newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
          }
      
          // التحقق من كلمة المرور
          if (!validatePassword(formData.password)) {
            newErrors.password = "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل";
          }
      
          // التحقق من تطابق كلمتي المرور
          if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "كلمتا المرور غير متطابقتين!";
          }
      
          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setFlag(false);
            return;
          }
      
          console.log("بيانات المستخدم:", formData);
        };
