import Card from "@/components/common/Card";
import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Input/Select";

const PersonalInfo = ({ formik }: any) => {
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="First Name"
          placeholder="First Name"
          id="firstName"
          name="firstName"
          value={formik.values.firstName ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName ? formik.errors.firstName : undefined}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          value={formik.values.lastName ?? ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName ? formik.errors.lastName : undefined}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="Email"
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
        />
        <Input
          label="mobile"
          placeholder="mobile"
          type="number"
          id="mobile"
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mobile ? formik.errors.mobile : undefined}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Select
          label="Gender"
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
          error={formik.touched.gender ? formik.errors.gender : undefined}
        />
        <Input
          label="Date of Birth"
          placeholder="Date of Birth"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.dateOfBirth ? formik.errors.dateOfBirth : undefined
          }
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
    </Card>
  );
};

export default PersonalInfo;
