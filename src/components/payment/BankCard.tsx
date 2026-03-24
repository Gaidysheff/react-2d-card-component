import Globe from "@/assets/images/payment/globe.svg";
import { useForm, useStore, type AnyFieldApi } from "@tanstack/react-form";
import Button from "./../uiComponents/Button.tsx";
import { z } from "zod";
import CardLogo from "./CardLogo.tsx";
import CardNumber from "./CardNumber.tsx";
import CardVerificationCode from "./CardVerificationCode.tsx";
import Expiration from "./Expiration.tsx";
import HolderName from "./HolderName.tsx";
import { Spinner } from "./../ui/spinner.tsx";
import { CURRENT_YEAR } from "@/lib/utilities.ts";
import { useRef, useState, type SyntheticEvent, type ReactNode } from "react";

interface FormProps {
  onSubmitData: (data: Record<string, string>) => Promise<any>;
  t: Record<string, string>;
}

const bankCardSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "required" })
    .min(2, { message: "two_chars" })
    .regex(/^[a-zA-Z\s]+$/, { message: "latin_chars" }),
  cvc: z
    .string()
    .regex(/^\d+$/, { message: "cvc_digits" })
    .length(3, { message: "cvc_three" }),
  month: z.string().min(1),
  year: z.string().min(4),
  firstSet: z.string().min(1).length(4, { message: "no_of_digits" }),
  secondSet: z.string().min(1).length(4, { message: "no_of_digits" }),
  thirdSet: z.string().min(1).length(4, { message: "no_of_digits" }),
  fourthSet: z.string().min(1).length(4, { message: "no_of_digits" }),
  additionalSet: z
    .string()
    .refine((val) => val.length === 0 || val.length === 3, {
      message: "additional_digits",
    }),
});

export type BankCardSchemaType = z.infer<typeof bankCardSchema>;

function getFieldError(field: AnyFieldApi): ReactNode {
  const errors = field.state.meta.errors;

  if (errors.length === 0 || !field.state.meta.isTouched) return null;

  return (
    <ul
      className="text-[0.5rem] 2xsm:text-[0.7rem] xsm:text-[0.9rem]
      sm:text-[1.1rem]"
    >
      {errors.map((err, index) => (
        <li key={index}>
          {typeof err === "string" ? err : err?.message || ""}
        </li>
      ))}
    </ul>
  );
}

const BankCard = ({ onSubmitData, t }: FormProps) => {
  const bankCardForm = useForm({
    defaultValues: {
      userName: "",
      cvc: "",
      month: "1",
      year: String(CURRENT_YEAR),
      firstSet: "",
      secondSet: "",
      thirdSet: "",
      fourthSet: "",
      additionalSet: "",
    },

    validators: {
      onChange: bankCardSchema,
      onMount: bankCardSchema,
    },

    onSubmit: async ({ value }) => {
      try {
        await onSubmitData(value);
      } catch (err) {
        console.error("Payment failed", err);
      }
    },
  });

  const formValues = useStore(bankCardForm.store, (state) => state.values);

  const firstSetRef = useRef<HTMLInputElement>(null);
  const secondSetRef = useRef<HTMLInputElement>(null);
  const thirdSetRef = useRef<HTMLInputElement>(null);
  const fourthSetRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLSelectElement>(null);
  const yearRef = useRef<HTMLSelectElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  const [cardType, setCardType] = useState<string>(Globe);

  const updateField = (field: keyof BankCardSchemaType, value: string) => {
    bankCardForm.setFieldValue(field, value);

    bankCardForm.setFieldMeta(field, (prev) => ({ ...prev, isTouched: true }));

    bankCardForm.validate("change");
  };

  const isSubmitting = useStore(bankCardForm.store, (s) => s.isSubmitting);
  const canSubmit = useStore(bankCardForm.store, (state) => state.canSubmit);

  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    bankCardForm.handleSubmit();
  };

  return (
    <div>
      <form
        className="text-white relative"
        onSubmit={submitHandler}
        autoComplete="off"
      >
        {/* --------- Front side of the card --------- */}
        <div
          className="bg-myMainColorDark border-2 border-myMainColorDarker
          rounded-2xl p-4 xsm:p-6 sm:p-8 mb-20
          w-[13rem] 2xsm:w-[15.6rem] xsm:w-[19.5rem] sm:w-[26rem] 
          h-[8.25rem] 2xsm:h-[9.9rem] xsm:h-[12.375rem] sm:h-[16.5rem]
          flex flex-col gap-1 sm:gap-2 z-1 overflow-hidden relative
          before:content-[''] before:absolute before:h-[600px] before:w-[600px]
          before:rounded-[100%] before:bg-myMainColorLighter/50 before:-z-1
          before:-top-[380px] before:-left-[250px]
          after:content-[''] after:absolute after:h-[700px] after:w-[700px]
          after:rounded-[100%] after:bg-myMainColorLight/50 after:-z-1
          after:-bottom-[520px] after:-left-[200px]"
        >
          <CardLogo cardType={cardType} />

          <CardNumber
            inputRefs={[firstSetRef, secondSetRef, thirdSetRef, fourthSetRef]}
            nextRef={userNameRef}
            setCardType={setCardType}
            values={formValues}
            onFieldChange={updateField}
            t={t}
          />

          <div className="flex justify-between gap-2">
            <bankCardForm.Field
              name="userName"
              children={(field) => (
                <HolderName
                  inputRef={userNameRef}
                  nextRef={monthRef}
                  userName={formValues.userName}
                  onFieldChange={updateField}
                  error={getFieldError(field)}
                  t={t}
                />
              )}
            />

            <Expiration
              monthRef={monthRef}
              yearRef={yearRef}
              nextRef={cvcRef}
              month={formValues.month}
              year={formValues.year}
              onFieldChange={updateField}
              t={t}
            />
          </div>
        </div>
        {/* --------- Back side of the card --------- */}
        <div
          className="bg-myMainColorDark border-2 border-myMainColorDarker
          rounded-2xl p-8 absolute
          w-[13rem] 2xsm:w-[15.6rem] xsm:w-[19.5rem] sm:w-[26rem] 
          h-[8.25rem] 2xsm:h-[9.9rem] xsm:h-[12.375rem] sm:h-[16.5rem]
          top-[1rem] 2xsm:top-[1.2rem] xsm:top-[1.5rem] sm:top-[2rem]
          left-[2rem] 2xsm:left-[2.4rem] xsm:left-[3rem] sm:left-[4rem]"
        >
          <div
            className="bg-black absolute left-0 right-0 top-[1.5rem]
            h-[1.875rem] 2xsm:h-[2.25rem] xsm:h-[2.8125rem] sm:h-[3.75rem]"
          ></div>

          <bankCardForm.Field
            name="cvc"
            children={(field) => (
              <CardVerificationCode
                inputRef={cvcRef}
                cvc={formValues.cvc}
                onFieldChange={updateField}
                error={getFieldError(field)}
                t={t}
              />
            )}
          />
        </div>
        <div
          className="w-[15rem] 2xsm:w-[18rem] xsm:w-[22.5rem] sm:w-[30rem]
        -mr-[2rem] 2xsm:-mr-[2.4rem] xsm:-mr-[3rem] sm:-mr-[4rem]"
        >
          <Button
            disabled={!canSubmit || isSubmitting}
            handleClick={submitHandler}
            className="checkout-btn"
          >
            {isSubmitting ? (
              <div className="flex justify-center">
                <p className="mr-5">Processing...</p>
                <Spinner className="size-5 text-red-500" />
              </div>
            ) : !canSubmit ? (
              `${t.fill}`
            ) : (
              `${t.pay}`
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BankCard;
