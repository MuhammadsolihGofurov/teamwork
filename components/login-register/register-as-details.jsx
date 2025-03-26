import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { File, Input, Radio, Select } from "../custom/form";
import { useIntl } from "react-intl";
import { ButtonSpinner } from "../custom/loading";
import { formatDate } from "@/utils/funcs";
import { Breadcrumbs } from "../custom";
import { toast } from "react-toastify";
import DatePickerUi from "../custom/form/details/date-picker";
import { EXPERT, REGISTERASUSERTYPE, REGISTERAUTHKEY } from "@/utils/data";
import { ProfileUrl, RegisterWithSpecialistsUrl } from "@/utils/router";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "@/redux/slice/user";
import { authAxios } from "@/utils/axios";
import { useFetchData } from "@/hooks/useFetchData";

export default function RegisterAsDetails({ page }) {
  const router = useRouter();
  const intl = useIntl();
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      date_of_birth: "",
      gender: "",
      country_id: "",
      district_id: "",
      region_id: "",
      address_name: "",
    },
  });

  useEffect(() => {
    dispatch(setProfilePercentage(35));
  }, []);

  // const { data, isLoading, error } = useFetchData(
  //   "/user/me?expand=expert,employer.legalEntity,employer.physicalPerson",
  //   true
  // );

  const submitFn = async (data) => {
    const { date_of_birth } = data;
    try {
      setReqLoading(true);

      const correct_birthday = formatDate(date_of_birth);

      const payload = {
        ...data,
        date_of_birth: correct_birthday,
      };

      const response = await authAxios.post(
        "/user/update-expert-data?expand=specialitySets.parent",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      // localStorage.setItem(REGISTERAUTHKEY, response?.data?.data?.auth_key);

      toast.success(
        intl.formatMessage({ id: "register-as-details-success-message" })
      );

      setTimeout(() => {
        router.push(`/${RegisterWithSpecialistsUrl}`);
      }, 500);
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className="flex flex-col gap-9 w-full items-center lg:items-start text-start"
    >
      <Breadcrumbs
        data={[
          {
            id: 1,
            name: intl.formatMessage({ id: "register-as-bread" }),
            url: "auth/register",
          },
        ]}
        isReturn
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 items-start w-full">
        {/* <div className="col-span-1 sm:col-span-2">
          <File page={page} />
        </div> */}

        <DatePickerUi
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
          page={"gender"}
          validation={{
            required: intl.formatMessage({ id: "RequiredGender" }),
          }}
          control={control}
        />

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
          page={"address"}
          isIcon={true}
          validation={{
            required: "FIO majburiy",
          }}
          control={control}
        />
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? <ButtonSpinner /> : intl.formatMessage({ id: "next" })}
        </button>
      </div>
    </form>
  );
}
