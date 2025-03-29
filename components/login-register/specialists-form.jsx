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
import { useDispatch, useSelector } from "react-redux";
import { setSkillIds, setSpecialityIds } from "@/redux/slice/settings";
import { setProfilePercentage } from "@/redux/slice/user";
import { authAxios } from "@/utils/axios";

export default function SpecialistsForm({ page }) {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const { specialityChildren, skillLists } = useSelector(
    (state) => state.settings
  );
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
      speciality_ids: "",
      skill_ids: "",
    },
  });

  useEffect(() => {
    dispatch(setProfilePercentage(25));
  }, []);

  const submitFn = async (data) => {
    const { speciality_children, speciality_ids, skill_ids } = data;
    try {
      setReqLoading(true);

      const payload = {
        skill_ids,
        speciality_ids: [speciality_ids, ...speciality_children],
      };

      const response = await authAxios.post(
        "/user/update-expert-data?expand=specialitySets.parent",
        payload
      );


      toast.success(
        intl.formatMessage({ id: "register-as-details-success-message" })
      );

      // setTimeout(() => {
      //   router.push("/auth/register/sms-code");
      // }, 500);
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
        <Select
          errors={errors?.speciality_id}
          type={"text"}
          register={register}
          name={"speciality_ids"}
          title={intl.formatMessage({ id: "Speciality" })}
          placeholder={""}
          id="speciality_ids"
          required
          state={"speciality"}
          isIcon={true}
          validation={{
            required: intl.formatMessage({ id: "RequiredSpeciality" }),
          }}
          control={control}
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
          validation={{
            required: intl.formatMessage({ id: "RequiredSkillIds" }),
          }}
          control={control}
          select_type="multiple_skill_ids"
          selectedState={skillLists}
          setSelectedAction={setSkillIds}
        />
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main w-full sm:min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
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
