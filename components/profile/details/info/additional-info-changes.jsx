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
  MainInfoUpdateSkeleton,
  PhyiscalInfoUpdateSkeleton,
} from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import {
  setCountryId,
  setRegionId,
  setSkillIds,
  setSpecialityCurrent,
  setSpecialityIds,
} from "@/redux/slice/settings";

export default function InfoPhysicalChanges({ page = "profile", isMobile }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const { specialityChildren, skillLists, specialities } = useSelector(
    (state) => state.settings
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
      gender: "",
      date_of_birth: "",
      email: "",
      country_id: "",
      region_id: "",
      district_id: "",
      address_name: "",
      other_phone: "",
      site: "",
      passport: {
        serial: "",
        number: "",
        given_time: "",
        given_by_whom: "",
        expire_date: "",
        attachment_id: "",
        passport_type: "",
      },
      hourly_salary: "",
      necessary_information: "",
      language: "",
      languages: "",
      skill_ids: "",
      speciality_ids: "",
      speciality_id: "",
    },
  });

  useEffect(() => {
    const user = user_info?.expert;
    const gender = user?.gender;
    const addres = user?.address;
    const birthDate = user?.date_of_birth;
    const passport = user?.passport;

    setValue("full_name", user?.full_name);
    setValue("email", user?.email);
    setValue("gender", gender);
    setValue("other_phone", user?.other_phone?.slice(3) ?? "");
    setValue("site", user?.site);
    setValue("country_id", addres?.district?.region?.country?.id);
    dispatch(setCountryId(addres?.district?.region?.country?.id));
    setValue("region_id", addres?.district?.region?.id);
    dispatch(setRegionId(addres?.district?.region?.id));
    setValue("district_id", addres?.district?.id);
    setValue("address_name", addres?.home);
    setValue("hourly_salary", user?.hourly_salary);
    setValue("necessary_information", user?.necessary_information);
    setValue("language", user?.language);
    setValue("languages", user?.languages);
    setValue("skill_ids", user?.skillSets);
    dispatch(setSkillIds(user?.skillSets ?? []));
    setValue("speciality_ids", user?.specialitySets);
    dispatch(setSpecialityIds(user?.specialitySets ?? []));

    // speciality current
    const currentSpecialityId =
      specialityChildren?.[0]?.parent_id ?? specialityChildren?.[0]?.id;
    const currentSpeciality = specialities?.find(
      (item) => item.id == currentSpecialityId
    );

    dispatch(setSpecialityCurrent(currentSpeciality));
    setValue("speciality_id", currentSpeciality?.id);

    // passport
    setValue("passport.attachment_id", passport?.attachment_id);
    setValue("passport.given_by_whom", passport?.given_by_whom);
    setValue("passport.number", passport?.number);
    setValue("passport.passport_type", passport?.type);
    setValue("passport.serial", passport?.serial);
    setValue("passport.expire_date", {
      startDate: passport?.expire_date,
      endDate: passport?.expire_date,
    });
    setValue("passport.given_time", {
      startDate: passport?.given_time,
      endDate: passport?.given_time,
    });

    if (birthDate) {
      setValue("date_of_birth", { startDate: birthDate, endDate: birthDate });
    }
  }, [user_info, setValue]);

  const submitFn = async (data) => {
    const {
      full_name,
      gender,
      other_phone,
      email,
      date_of_birth,
      district_id,
      address_name,
      site,
      passport: {
        serial,
        number,
        given_time,
        given_by_whom,
        expire_date,
        passport_type,
        attachment_id,
      },
    } = data;
    try {
      setReqLoading(true);
      let phone = `${code}${unmaskPhone(other_phone)}`;

      const payload = {
        full_name,
        email,
        gender,
        date_of_birth: date_of_birth.startDate,
        district_id: district_id,
        address_name,
        other_phone: phone,
        site,
        passport: {
          serial,
          number,
          given_time: given_time?.startDate,
          given_by_whom,
          expire_date: expire_date?.startDate,
          attachment_id: image ?? attachment_id,
          passport_type,
        },
      };

      const response = await authAxios.post(
        "/user/update-expert-data?expand=specialitySets.parent",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      // localStorage.setItem(REGISTERAUTHKEY, response?.data?.data.auth_key);
      // localStorage.setItem(REGISTERPHONENUMBER, phone);

      toast.success(intl.formatMessage({ id: "success-update-personal-data" }));
      setTimeout(() => {
        dispatch(fetchUserData());
        reset();
      }, 1000);
      setImage(null);
      setImageSet(null);

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
    return <PhyiscalInfoUpdateSkeleton />;
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

      <Radio
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
      />

      <DatePickerUi
        errors={errors?.date_of_birth}
        type={"date"}
        register={register}
        name={"date_of_birth"}
        title={intl.formatMessage({ id: "birthday" })}
        placeholder={""}
        id={`date_of_birth${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredDateOfBirth" }),
        }}
        control={control}
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

      {/* skill */}
      <Select
        errors={errors?.speciality_id}
        type={"text"}
        register={register}
        name={"speciality_id"}
        title={intl.formatMessage({ id: "Speciality" })}
        placeholder={""}
        id="speciality_id"
        required
        state={"speciality"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredSpeciality" }),
        }}
        control={control}
        isCollect={true}
      />

      <Select
        errors={errors?.speciality_ids}
        type={"text"}
        register={register}
        name={"speciality_children"}
        title={intl.formatMessage({ id: "SpecialityChildren" })}
        placeholder={""}
        id="speciality_children"
        required={false}
        state={"speciality_children"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredSpecialityChildren" }),
        }}
        control={control}
        select_type="multiple_without_api"
        selectedState={specialityChildren}
        setSelectedAction={setSpecialityIds}
      />

      <Select
        errors={errors?.skill_ids}
        type={"text"}
        register={register}
        name={"skill_ids"}
        title={intl.formatMessage({ id: "SkillIds" })}
        placeholder={""}
        id="skill_ids"
        required
        state={"skill_ids"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredSkillIds" }),
        }}
        control={control}
        select_type="multiple_skill_ids"
        selectedState={skillLists}
        setSelectedAction={setSkillIds}
      />
      {/* skill */}

      <Select
        errors={errors?.language}
        type={"text"}
        register={register}
        name={"language"}
        title={intl.formatMessage({ id: "Passport turi" })}
        placeholder={""}
        id={`language${isMobile ? "1" : ""}`}
        required
        state={"languages"}
        withState="static"
        page={page}
        isIcon={false}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportType" }),
        }}
        control={control}
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

      <PhoneInput
        errors={errors?.other_phone}
        type={"text"}
        register={register}
        name={"other_phone"}
        placeholder={"___ __ ___ __ __"}
        id={`other_phone${isMobile ? "1" : ""}`}
        title={intl.formatMessage({ id: "Qo'shimcha Telefon raqami" })}
        setCode={setCode}
        page={page}
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

      <div className="col-span-1 lg:col-span-2 pt-5">
        <h4 className="font-semibold text-primary">
          {intl.formatMessage({ id: "Passport ma'lumotlari" })}
        </h4>
      </div>

      <Select
        errors={errors?.passport?.passport_type}
        type={"text"}
        register={register}
        name={"passport.passport_type"}
        title={intl.formatMessage({ id: "Passport turi" })}
        placeholder={""}
        id={`passport.passport_type${isMobile ? "1" : ""}`}
        required
        state={"passport"}
        withState="static"
        page={page}
        isIcon={false}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportType" }),
        }}
        control={control}
      />

      <Input
        errors={errors?.passport?.serial}
        type={"text"}
        register={register}
        name={"passport.serial"}
        title={intl.formatMessage({ id: "Seriyasi" })}
        placeholder={"AA"}
        id={`passport.serial${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportSerial" }),
          pattern: {
            value: /^[A-Z]{2}$/,
            message: "AA, AB, AC",
          },
        }}
        control={control}
      />

      <Input
        errors={errors?.passport?.number}
        type={"text"}
        register={register}
        name={"passport.number"}
        title={intl.formatMessage({ id: "Passport Raqami" })}
        placeholder={"1234567"}
        id={`passport.number${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportNumber" }),
          pattern: {
            value: /^[0-9]{7}$/,
            message: intl.formatMessage({ id: "IsNotValidPassportNumber" }),
          },
        }}
        control={control}
      />

      <Input
        errors={errors?.passport?.given_by_whom}
        type={"text"}
        register={register}
        name={"passport.given_by_whom"}
        title={intl.formatMessage({ id: "Kim tomondan berilgan" })}
        placeholder={intl.formatMessage({
          id: "Kim tomondan berilgan placeholder",
        })}
        id={`passport.given_by_whom${isMobile ? "1" : ""}`}
        required
        page={page}
        isIcon={true}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportWhoGiven" }),
          // pattern: {
          //   value: /^[0-9]{7}$/,
          //   message: intl.formatMessage({ id: "IsNotValidPassportNumber" }),
          // },
        }}
        control={control}
      />

      <DatePickerUi
        errors={errors?.passport?.given_time}
        type={"date"}
        register={register}
        name={"passport.given_time"}
        title={intl.formatMessage({ id: "Qachon berilgan" })}
        placeholder={""}
        id={`passport.given_time${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportGivenDate" }),
        }}
        control={control}
      />

      <DatePickerUi
        errors={errors?.passport?.expire_date}
        type={"date"}
        register={register}
        name={"passport.expire_date"}
        title={intl.formatMessage({ id: "Amal qilish muddati" })}
        placeholder={""}
        id={`passport.expire_date${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "RequiredPassportExpiredDate" }),
        }}
        control={control}
      />

      <div className="col-span-1 lg:col-span-2">
        <File
          page={"passport"}
          onFileUpload={(file) => setImage(file)}
          existingImage={imageSet}
          type="passport"
        />
      </div>

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
