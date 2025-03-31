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
} from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { MainInfoUpdateSkeleton } from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";

export default function InfoMainChanges({ page = "profile", isMobile }) {
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
  const [imageId, setImageId] = useState(null);
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
      full_name: "",
      phone_number: "",
      email: "",
      password: "",
      new_password_repeat: "",
      new_password: "",
      //   date_of_birth: {
      //     startDate: null,
      //     endDate: null,
      //   },
      //   gender: "",
    },
  });

  const new_password = watch("new_password");
  const new_password_repeat = watch("new_password_repeat");

  useEffect(() => {
    if (new_password_repeat && new_password !== new_password_repeat) {
      setError("new_password_repeat", {
        type: "manual",
        message: intl.formatMessage({ id: "isNotEqualsPassword" }),
      });
    } else {
      clearErrors("new_password_repeat");
    }
  }, [new_password, new_password_repeat, setError, clearErrors]);

  useEffect(() => {
    const isExpert = current_user_type === EXPERT;
    // const gender = isExpert
    //   ? user_info?.expert?.gender
    //   : user_info?.employer?.physicalPerson?.gender;
    // const birthDate = isExpert
    //   ? user_info?.expert?.date_of_birth
    //   : user_info?.employer?.date_of_birth;

    setValue("full_name", user_info?.full_name || "");
    setValue("phone_number", user_info?.phone_number?.slice(3) ?? "");
    setValue("email", user_info?.email || "");
    // setValue("gender", gender || "");

    setImage(user_info?.photoUrl);

    // if (birthDate) {
    //   setValue("date_of_birth", { startDate: birthDate, endDate: birthDate });
    // }
  }, [user_info, current_user_type, setValue]);

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
        "/user/update-main-settings",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      localStorage.setItem(REGISTERAUTHKEY, response?.data?.data.auth_key);
      localStorage.setItem(REGISTERPHONENUMBER, phone);

      toast.success(intl.formatMessage({ id: "success-update-personal-data" }));
      dispatch(fetchUserData());

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

  if (loading) {
    return <MainInfoUpdateSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white ${
        isMobile ? "sm:hidden grid" : "sm:grid hidden"
      } grid-cols-1 lg:grid-cols-2 items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <File
        page={page}
        onFileUpload={(file) => setImage(file)}
        onFileUploadId={(id) => setImageId(id)}
        existingImage={image}
        isReFetchData={true}
      />

      <div className="text-sm text-main sm:block hidden">
        <p className="pt-3">
          {intl.formatMessage({ id: "image-required-body" })}
        </p>
      </div>

      <Input
        errors={errors?.full_name}
        type={"text"}
        register={register}
        name={"full_name"}
        title={intl.formatMessage({ id: "FIO" })}
        placeholder={intl.formatMessage({ id: "Passportga ko’ra" })}
        id={`full_name${isMobile ? "1" : ""}`}
        required
        page={page}
        setCode={setCode}
        validation={{
          required: intl.formatMessage({ id: "RequiredName" }),
        }}
      />

      {/* <Radio
        errors={errors?.gender}
        type={"radio"}
        register={register}
        name={"gender"}
        title={intl.formatMessage({ id: "gender" })}
        placeholder={""}
        id="gender"
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredGender" }),
        }}
        control={control}
      /> */}

      <PhoneInput
        errors={errors?.phone_number}
        type={"text"}
        register={register}
        name={"phone_number"}
        placeholder={"___ __ ___ __ __"}
        id={`phone_number${isMobile ? "1" : ""}`}
        required
        noSelected
        title={intl.formatMessage({ id: "Telefon raqami" })}
        setCode={setCode}
        page={page}
        value={watch("phone_number")} // Qo'shildi
        onChange={(e) => setValue("phone_number", e.target.value)} // Qo'shildi
        validation={{
          required: intl.formatMessage({ id: "requiredPhone" }),
          //   pattern: {
          //     // value: /^\d{2} \d{3}-\d{2}-\d{2}$/,
          //     message: intl.formatMessage({ id: "isNotEqualsPhone" }),
          //   },
        }}
      />

      <Input
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
      />

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
        <h4 className="font-semibold text-primary text-lg">
          {intl.formatMessage({ id: "Profil himoya sozlamalari" })}
        </h4>
      </div>

      <Password
        errors={errors?.password}
        type={"password"}
        register={register}
        name={"password"}
        placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
        title={intl.formatMessage({ id: "Amaldagi parol" })}
        id={`passowrd${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassword" }),
          minLength: {
            value: 6,
            message: intl.formatMessage({ id: "password6RequiredTypes" }),
          },
        }}
      />

      <Password
        errors={errors?.new_password}
        type={"password"}
        register={register}
        name={"new_password"}
        placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
        title={intl.formatMessage({ id: "Yangi parol" })}
        id={`new_password${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassword" }),
          minLength: {
            value: 6,
            message: intl.formatMessage({ id: "password6RequiredTypes" }),
          },
        }}
      />

      <Password
        errors={errors?.new_password_repeat}
        type={"password"}
        register={register}
        name={"new_password_repeat"}
        placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
        title={intl.formatMessage({ id: "Yangi parolni takrorlash" })}
        id={`new_password_repeat${isMobile ? "1" : ""}`}
        required={false}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassword" }),
          minLength: {
            value: 6,
            message: intl.formatMessage({ id: "password6RequiredTypes" }),
          },
          validate: (value) =>
            value === new_password ||
            intl.formatMessage({ id: "isNotEqualsPassword" }),
        }}
      />

      {/* <Password
        errors={errors?.password}
        type={"password"}
        register={register}
        name={"password"}
        placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
        title={intl.formatMessage({ id: "Yangi parol" })}
        id="password"
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassword" }),
          minLength: {
            value: 6,
            message: intl.formatMessage({ id: "password6RequiredTypes" }),
          },
        }}
      /> */}

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row col-span-1 lg:col-span-2 sm:w-auto w-full pt-6 sm:pt-14">
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
