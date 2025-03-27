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
} from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import {
  AdditionalInfoUpdateSkeleton,
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
    const {} = data;
    try {
      setReqLoading(true);

      const payload = {};

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
    return <AdditionalInfoUpdateSkeleton />;
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
