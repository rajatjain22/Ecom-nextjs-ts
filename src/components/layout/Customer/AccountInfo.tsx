import Card from "@/components/common/Card";
import Input from "@/components/common/Input/Input";

const AccountInfo = ({ formik }: any) => {
  return (
    <Card className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Account Info</h2>
      <Input
        label="Username"
        placeholder="Username"
        id="username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username ? formik.errors.username : undefined}
      />
      <div className="flex flex-col sm:flex-row sm:gap-5 space-y-2 sm:space-y-0">
        <Input
          label="Password"
          placeholder="********"
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password ? formik.errors.password : undefined}
        />
        <Input
          label="Confirm Password"
          placeholder="********"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : undefined
          }
        />
      </div>
    </Card>
  );
};

export default AccountInfo;
