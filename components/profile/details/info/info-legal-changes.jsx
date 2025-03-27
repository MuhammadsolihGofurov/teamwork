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
import {
    LegalInfoUpdateSkeleton,
  MainInfoUpdateSkeleton,
  PhyiscalInfoUpdateSkeleton,
} from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import { setCountryId, setRegionId } from "@/redux/slice/settings";

export default function InfoLegalChanges({ page = "profile", isMobile }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, current_user_type, loading } = useSelector(
    (state) => state.user
  );
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const [imageSet, setImageSet] = useState(null);
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
      full_name: "",
      email: "",
      country_id: "",
      region_id: "",
      district_id: "",
      address_name: "",
      address_zip_code: "",
      telegram_phone: "",
      site: "",
      account_number: "",
      bank_name: "",
      company_name: "",
      ifut: "",
      inn: "",
      legal_address: "",
      mfo: "",
    },
  });

  useEffect(() => {
    const user = user_info?.employer?.legalEntity;
    const gender = user?.gender;
    const addres = user?.address;

    setValue("full_name", user?.full_name);
    setValue("email", user?.email);
    setValue("telegram_phone", user?.telegram_phone?.slice(3) ?? "");
    setValue("site", user?.site);
    setValue("account_number", user?.account_number);
    setValue("bank_name", user?.bank_name);
    setValue("company_name", user?.company_name);
    setValue("ifut", user?.ifut);
    setValue("inn", user?.inn);
    setValue("legal_address", user?.legal_address);
    setValue("mfo", user?.mfo);
    setValue("country_id", addres?.district?.region?.country?.id);
    dispatch(setCountryId(addres?.district?.region?.country?.id));
    setValue("region_id", addres?.district?.region?.id);
    dispatch(setRegionId(addres?.district?.region?.id));
    setValue("district_id", addres?.district?.id);
    setValue("address_name", addres?.home);
    setValue("address_zip_code", addres?.zip_code);
  }, [user_info, setValue]);

  const submitFn = async (data) => {
    const {
      full_name,
      telegram_phone,
      email,
      district_id,
      address_name,
      legal_address,
      site,
      account_number,
      bank_name,
      company_name,
      ifut,
      inn,
      mfo,
      address_zip_code,
    } = data;
    try {
      setReqLoading(true);
      let phone = `${code}${unmaskPhone(telegram_phone)}`;

      const payload = {
        full_name,
        email,
        district_id: district_id,
        address_name,
        telegram_phone: phone,
        site,
        legal_address,
        account_number,
        bank_name,
        company_name,
        ifut,
        inn,
        mfo,
        address_zip_code,
      };

      const response = await authAxios.post(
        "/user/update-legal-entity-data",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      // localStorage.setItem(REGISTERAUTHKEY, response?.data?.data.auth_key);
      // localStorage.setItem(REGISTERPHONENUMBER, phone);

      toast.success(intl.formatMessage({ id: "success-update-legal-data" }));
      setTimeout(() => {
        dispatch(fetchUserData());
        reset();
      }, 1000);

      //   setImage(null);
      //   setImageSet(null);

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
      return <LegalInfoUpdateSkeleton />;
    }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white ${
        isMobile ? "sm:hidden grid" : "sm:grid hidden"
      } grid-cols-1 lg:grid-cols-2 items-start gap-6 p-8 rounded-lg border border-bg-3`}
    >
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
        <h3
          role="heading"
          className="text-lg sm:text-xl font-medium text-primary"
        >
          {intl.formatMessage({ id: "Yuridik shax ma'lumotlarini to'ldiring" })}
        </h3>
        <p
          role="text"
          className="text-primary text-opacity-60 text-sm font-normal"
        >
          {intl.formatMessage({
            id: "Marhamat profilingizni batafsil to’ldiring!",
          })}
        </p>
      </div>

      <Input
        errors={errors?.full_name}
        type={"text"}
        register={register}
        name={"full_name"}
        title={intl.formatMessage({ id: "Mas’ul shaxs FISH" })}
        placeholder={intl.formatMessage({ id: "Passportga ko’ra" })}
        id={`full_name${isMobile ? "1" : ""}`}
        required
        page={page}
        setCode={setCode}
        validation={{
          required: intl.formatMessage({ id: "RequiredName" }),
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
      />

      <Input
        errors={errors?.company_name}
        type={"text"}
        register={register}
        name={"company_name"}
        title={intl.formatMessage({ id: "Tashkilot nomi" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`company_name${isMobile ? "1" : ""}`}
        required
        page={page}
        setCode={setCode}
        validation={{
          required: intl.formatMessage({ id: "RequiredCompanyName" }),
        }}
      />

      <Input
        errors={errors?.bank_name}
        type={"text"}
        register={register}
        name={"bank_name"}
        title={intl.formatMessage({ id: "Bank nomi" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`bank_name${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredBankName" }),
        }}
      />

      <Input
        errors={errors?.account_number}
        type={"text"}
        register={register}
        name={"account_number"}
        title={intl.formatMessage({ id: "Account nomi" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`account_number${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredAccountName" }),
        }}
      />

      <Input
        errors={errors?.mfo}
        type={"text"}
        register={register}
        name={"mfo"}
        title={intl.formatMessage({ id: "MFO" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`mfo${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredMFO" }),
        }}
      />

      <Input
        errors={errors?.inn}
        type={"text"}
        register={register}
        name={"inn"}
        title={intl.formatMessage({ id: "INN" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`inn${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredINN" }),
        }}
      />

      <Input
        errors={errors?.ifut}
        type={"text"}
        register={register}
        name={"ifut"}
        title={intl.formatMessage({ id: "IFUT unrequired" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`ifut${isMobile ? "1" : ""}`}
        page={page}
      />

      <Select
        errors={errors?.country_id}
        type={"text"}
        register={register}
        name={"country_id"}
        title={intl.formatMessage({ id: "Mamlakat" })}
        placeholder={""}
        id={`country_id${isMobile ? "1" : ""}`}
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
        id={`region_id${isMobile ? "1" : ""}`}
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
        id={`district_id${isMobile ? "1" : ""}`}
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
        id={`address_name${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredAddress" }),
        }}
        control={control}
      />

      <Input
        errors={errors?.address_zip_code}
        type={"text"}
        register={register}
        name={"address_zip_code"}
        title={intl.formatMessage({ id: "Index" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`address_zip_code${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredAddressIndex" }),
        }}
        control={control}
      />

      <Input
        errors={errors?.legal_address}
        type={"text"}
        register={register}
        name={"legal_address"}
        title={intl.formatMessage({ id: "Yuridik manzil" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`legal_address${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredAddressLegal" }),
        }}
        control={control}
      />

      <PhoneInput
        errors={errors?.telegram_phone}
        type={"text"}
        register={register}
        name={"telegram_phone"}
        placeholder={"___ __ ___ __ __"}
        id={`telegram_phone${isMobile ? "1" : ""}`}
        // required
        title={intl.formatMessage({ id: "Telefon raqami telegram" })}
        setCode={setCode}
        page={page}
        validation={
          {
            //   required: intl.formatMessage({ id: "requiredPhone" }),
            //   pattern: {
            //     value: /^\d{2} \d{3}-\d{2}-\d{2}$/,
            //     message: intl.formatMessage({ id: "isNotEqualsPhone" }),
            //   },
          }
        }
      />

      <Input
        errors={errors?.site}
        type={"text"}
        register={register}
        name={"site"}
        title={intl.formatMessage({ id: "Site" })}
        placeholder={intl.formatMessage({ id: "Site placeholder" })}
        id={`site${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredSite" }),
          pattern: {
            value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?$/,
            message: intl.formatMessage({ id: "isNotValidURL" }),
          },
        }}
        control={control}
      />

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
