import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { unmaskPhone } from "@/utils/funcs";
import axios, { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import {
  CUSTOMER,
  ENGLISH_LG,
  EXPERT,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
  RUSSIAN_LG,
  UZBEK_LG,
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
  Textarea,
} from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import {
  AdditionalInfoUpdateSkeleton,
  BioInfoUpdateSkeleton,
  MainInfoUpdateSkeleton,
  PhyiscalInfoUpdateSkeleton,
} from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import {
  setCountryId,
  setLanguagesData,
  setRegionId,
  setSkillIds,
  setSpecialityCurrent,
  setSpecialityIds,
} from "@/redux/slice/settings";

export default function BioInfoChanges({ page = "profile", isMobile }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const { specialityChildren, skillLists, specialities, languagesData } =
    useSelector((state) => state.settings);
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
      necessary_information: "",
    },
  });

  useEffect(() => {
    const user = user_info?.expert;

    setValue("necessary_information", user?.necessary_information);
  }, [user_info, setValue]);

  const submitFn = async (data) => {
    const { necessary_information } = data;
    const {
      full_name,
      gender,
      date_of_birth,
      other_phone,
      site,
      address: { home, zip_code, district },
      skillSets,
      specialitySets,
      hourly_salary,
      language,
      languages,
      passport: {
        serial,
        number,
        given_time,
        given_by_whom,
        expire_date,
        attachment_id,
        type,
      },
    } = user_info?.expert;
    try {
      setReqLoading(true);

      const payload = {
        full_name,
        gender,
        date_of_birth,
        district_id: district?.id,
        address_name: home,
        other_phone,
        site,
        skill_ids: skillSets.map((item) => item.id),
        speciality_ids: specialitySets.map((item) => item.id),
        hourly_salary,
        language: language,
        languages: languages,
        passport: {
          serial,
          number,
          given_time,
          given_by_whom,
          expire_date,
          attachment_id,
          passport_type: type,
        },
        necessary_information,
      };

      console.error(payload);

      const response = await authAxios.post(
        "/user/update-expert-data?expand=specialitySets.parent",
        payload
      );

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
    return <BioInfoUpdateSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white ${
        isMobile ? "sm:hidden grid" : "sm:grid hidden"
      } grid-cols-1 items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <Textarea
        errors={errors?.necessary_information}
        type={"text"}
        register={register}
        name={"necessary_information"}
        title={intl.formatMessage({ id: "O'zingiz haqingizda" })}
        placeholder={intl.formatMessage({ id: "Kiriting" })}
        id={`necessary_information${isMobile ? "1" : ""}`}
        required
        page={page}
        setCode={setCode}
        validation={{
          required: intl.formatMessage({ id: "RequiredInfo" }),
        }}
        watch={watch}
      />

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row col-span-1 sm:w-auto w-full pt-6 sm:pt-14">
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
