import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { unmaskPhone } from "@/utils/funcs";
import axios, { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import {
  CUSTOMER,
  EXPERT,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, setProfilePercentage } from "@/redux/slice/user";
import {
  File,
  Input,
  Password,
  PhoneInput,
  Radio,
  Select,
} from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { MainInfoUpdateSkeleton } from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import { setCountryId, setRegionId } from "@/redux/slice/settings";

export default function InfoPhysicalChanges({ page = "profile", isMobile }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, current_user_type, loading } = useSelector(
    (state) => state.user
  );
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  // Profile rasmi
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      gender: "",
      country_id: "",
      region_id: "",
      district_id: "",
      address_name: "",
    },
  });

  useEffect(() => {
    const gender = user_info?.employer?.physicalPerson?.gender;
    const addres = user_info?.employer?.physicalPerson?.address;
    // const birthDate = isExpert
    //   ? user_info?.expert?.date_of_birth
    //   : user_info?.employer?.date_of_birth;

    setValue("gender", gender || "");
    setValue("country_id", addres?.district?.region?.country?.id);
    dispatch(setCountryId(addres?.district?.region?.country?.id));
    setValue("region_id", addres?.district?.region?.id);
    dispatch(setRegionId(addres?.district?.region?.id));
    setValue("district_id", addres?.district?.id);
    setValue("address_name", addres?.home);
    // if (birthDate) {
    //   setValue("date_of_birth", { startDate: birthDate, endDate: birthDate });
    // }
  }, [user_info, setValue]);

  const submitFn = async (data) => {
    const {
      phone_number,
      password,
      new_password,
      new_password_repeat,
      email,
      full_name,
    } = data;
    try {
      setReqLoading(true);
      let phone = `${code}${unmaskPhone(phone_number)}`;

      const payload = {
        phone_number: phone,
        password,
        new_password_repeat,
        new_password,
        full_name,
        email,
      };

      const response = await authAxios.post(
        "/user/update-physical-person-data",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      //   localStorage.setItem(REGISTERAUTHKEY, response?.data?.data.auth_key);
      //   localStorage.setItem(REGISTERPHONENUMBER, phone);

      //   toast.success(intl.formatMessage({ id: "success-update-personal-data" }));
      //   dispatch(fetchUserData());

      reset();

      //   setTimeout(() => {
      //     router.push("/auth/register/sms-code");
      //   }, 500);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  //   if (loading) {
  //     return <MainInfoUpdateSkeleton />;
  //   }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white ${
        isMobile ? "sm:hidden grid" : "sm:grid hidden"
      } grid-cols-1 lg:grid-cols-2 items-start gap-6 p-8 rounded-lg border border-bg-3`}
    >
      {/* <File
        page={page}
        onFileUpload={(file) => setImage(file)}
        existingImage={image}
      /> */}
      <Select
        errors={errors?.country_id}
        type={"text"}
        register={register}
        name={"country_id"}
        title={intl.formatMessage({ id: "Mamlakat" })}
        placeholder={""}
        id="country_id"
        required
        state={"country"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredCountry" }),
        }}
        control={control}
      />

      <Select
        errors={errors?.region_id}
        type={"text"}
        register={register}
        name={"region_id"}
        title={intl.formatMessage({ id: "Viloyat" })}
        placeholder={""}
        id="region_id"
        required
        state={"region"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredRegion" }),
        }}
        control={control}
        isAuth={true}
      />

      <Select
        errors={errors?.district_id}
        type={"text"}
        register={register}
        name={"district_id"}
        title={intl.formatMessage({ id: "Tuman" })}
        placeholder={""}
        id="district_id"
        required
        state={"district"}
        page={page}
        isIcon={false}
        validation={{
          required: intl.formatMessage({ id: "RequiredDistrict" }),
        }}
        control={control}
        isAuth={true}
      />

      <Input
        errors={errors?.address_name}
        type={"text"}
        register={register}
        name={"address_name"}
        title={intl.formatMessage({ id: "Yashash manzili" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id="address_name"
        required
        page={page}
        isIcon={true}
        validation={{
          required: "FIO majburiy",
        }}
        control={control}
      />

      {/* <Input
        errors={errors?.email}
        type={"text"}
        register={register}
        name={"email"}
        title={intl.formatMessage({ id: "E-mail" })}
        placeholder={intl.formatMessage({ id: "E-mail" })}
        id={`email${isMobile ? "1" : ""}`}
        required={false}
        page={page}
        setCode={setCode}
      /> */}

      {/* <DatePickerUi
        errors={errors?.date_of_birth}
        type={"date"}
        register={register}
        name={"date_of_birth"}
        title={intl.formatMessage({ id: "birthday" })}
        placeholder={""}
        id="date_of_birth"
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredDateOfBirth" }),
        }}
        control={control}
      /> */}

      <div className="col-span-1 lg:col-span-2 pt-5">
        <h4 className="font-semibold text-primary">
          {intl.formatMessage({ id: "Profil himoya sozlamalari" })}
        </h4>
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row col-span-1 lg:col-span-2 sm:w-auto w-full pt-6 sm:pt-20">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main w-full rounded-lg flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? (
            <ButtonSpinner />
          ) : (
            intl.formatMessage({ id: "Yangilash" })
          )}
        </button>
      </div>
    </form>
  );
}
