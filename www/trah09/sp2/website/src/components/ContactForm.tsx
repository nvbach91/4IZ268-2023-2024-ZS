import type { FunctionComponent } from "react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMirrorLoading } from "shared-loading-indicator";
import Swal from "sweetalert2";
import type { AvaibilityDateFragment } from "../data/AvaibilityDateFragment";
import type { FormFieldsResult } from "../data/FormFieldsFragment";
import { api } from "../utilities/api";
import { isDefined } from "../utilities/isDefined";
import { Button } from "./Button";
import styles from "./ContactForm.module.sass";
import { Input } from "./Input";
import type { OptionType } from "./Select";
import { Select } from "./Select";

export type FormDataType = {
  name: string;
  email: string;
  tel: string;
  numberOfPeople: string;
  date: string;
  note?: string;
};

export type ContactFormProps = {
  formFields: FormFieldsResult;
  availibilityDates: AvaibilityDateFragment[];
};

export const ContactForm: FunctionComponent<ContactFormProps> = ({
  formFields,
  availibilityDates,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    tel: "",
    date: availibilityDates[0].id,
    numberOfPeople: "1",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const mutation = api.contact.send.useMutation({
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        tel: "",
        date: availibilityDates[0].id,
        numberOfPeople: "1",
      });
      !showSuccessMessage && setShowSuccessMessage(true);
      toast(formFields.successMessage, {
        type: "success",
      });
      Swal.fire({
        title: "Jaaaaj",
        text: "Form send successfully!",
        icon: "success",
      });
    },
    onError: () => {
      toast(formFields.errorMessage, {
        type: "error",
      });
    },
  });
  const isPending = mutation.isPending;
  useMirrorLoading(isPending);

  const dateOptions = useMemo(() => {
    return availibilityDates
      .map((availibilityDate) => {
        return availibilityDate.numberOfPeople >
          availibilityDate.numberOfOccupiedPlaces
          ? ({
              value: availibilityDate.id,
              label: `${new Date(availibilityDate.dateTime).toLocaleDateString(
                "cs-CZ",
                {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }
              )}; ${formFields.vacancies}: ${
                availibilityDate.numberOfPeople -
                availibilityDate.numberOfOccupiedPlaces
              } `,
            } satisfies OptionType)
          : null;
      })
      .filter(isDefined);
  }, [availibilityDates, formFields.vacancies]);

  return (
    <>
      {!showSuccessMessage ? (
        <form
          className={styles.wrapper}
          onSubmit={(event) => {
            event.preventDefault();
            mutation.mutate(formData);
          }}
        >
          {formFields.name && (
            <Input
              name="name"
              title={formFields.name}
              type="text"
              autoComplete="name"
              onChange={(value) => setFormData({ ...formData, name: value })}
              value={formData.name}
              required
            />
          )}
          {formFields.email && (
            <Input
              name="email"
              title={formFields.email}
              type="email"
              autoComplete="email"
              onChange={(value) => setFormData({ ...formData, email: value })}
              value={formData.email}
              required
            />
          )}
          {formFields.phone && (
            <Input
              name="tel"
              title={formFields.phone}
              type="text"
              autoComplete="tel"
              onChange={(value) => setFormData({ ...formData, tel: value })}
              value={formData.tel}
            />
          )}
          {formFields.numberOfPeople && (
            <Input
              name="numberOfPeople"
              title={formFields.numberOfPeople}
              type="number"
              min="1"
              onChange={(value) =>
                setFormData({ ...formData, numberOfPeople: value })
              }
              value={formData.numberOfPeople ?? "1"}
              required
            />
          )}
          {formFields.date && (
            <Select
              name="date"
              title={formFields.date}
              options={dateOptions}
              onChange={(value) => setFormData({ ...formData, date: value })}
              value={formData.date ?? dateOptions[0].value}
              required
            />
          )}
          {formFields.note && (
            <Input
              name="note"
              title={formFields.note}
              type="text"
              onChange={(value) => setFormData({ ...formData, note: value })}
              value={formData.note ?? ""}
              textarea
            />
          )}
          <div className={styles.submitButtonWrapper}>
            <div className={styles.submitButton}>
              <Button
                type="submit"
                size="medium"
                variant="primary"
                disabled={isPending}
                isFullWidth
              >
                {formFields.submitButtonLabel}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.successMessage}>{formFields.successMessage}</div>
      )}
    </>
  );
};
