import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "react-native";
import { randomUUID } from "expo-crypto";
import { useSpells } from "../contexts/SpellContext.tsx";
import { showMessage } from "react-native-flash-message";

import { SpellNameInput } from "../components/createSpell/SpellNameInput.tsx";
import { SpellLevelPicker } from "../components/createSpell/SpellLevelPicker.tsx";
import { SpellSchoolPicker } from "../components/createSpell/SpellSchoolPicker.tsx";
import { SpellSimpleInput } from "../components/createSpell/SpellSimpleInput.tsx";
import { SpellDescriptionInput } from "../components/createSpell/SpellDescriptionInput.tsx";
import { SpellComponentsCheckboxGroup } from "../components/createSpell/SpellComponentsCheckboxGroup.tsx";
import { SpellHigherLevelsInput } from "../components/createSpell/SpellHigherLevelsInput.tsx";

import {
  SpellLevelEnum,
  SchoolEnum,
  ComponentEnum,
  Spell,
} from "../../utils/spellType.ts";

const SpellSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  level: Yup.string().required("Level is required"),
  school: Yup.string().required("School is required"),
  castingTime: Yup.string().required("Casting time is required"),
  spellRange: Yup.string().required("Range is required"),
  duration: Yup.string().required("Duration is required"),
  description: Yup.string().required("Description is required"),
  components: Yup.array()
    .of(Yup.string())
    .min(1, "At least one component is required")
    .required("At least one component is required"),
  higherLevels: Yup.string().notRequired(),
});

type FormValues = {
  name: string;
  description: string;
  level: string;
  school: string;
  castingTime: string;
  spellRange: string;
  duration: string;
  components: ComponentEnum[];
  higherLevels?: string;
};

export const CreateSpellPage = () => {
  const { addHomebrewSpell } = useSpells();
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.header}>Create New Spell</Text>
        <Formik<FormValues>
          initialValues={{
            name: "",
            description: "",
            level: "",
            school: "",
            castingTime: "",
            spellRange: "",
            duration: "",
            components: [],
            higherLevels: "",
          }}
          validationSchema={SpellSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            const newSpell: Spell = {
              id: randomUUID(),
              name: values.name,
              level: values.level as SpellLevelEnum,
              school: values.school as SchoolEnum,
              castingTime: values.castingTime,
              spellRange: values.spellRange,
              duration: values.duration,
              description: values.description,
              components: values.components as ComponentEnum[],
              higherLevels: values.higherLevels || "",
              isHomebrew: true,
            };
            addHomebrewSpell(newSpell);
            showMessage({
              message: "Spell created!",
              type: "success",
              duration: 2000,
              icon: "success",
            });
            resetForm();
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            isSubmitting,
          }) => (
            <View style={styles.form}>
              <SpellNameInput
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={errors.name}
                touched={touched.name}
                styles={styles}
              />

              <SpellLevelPicker
                value={values.level}
                onValueChange={(itemValue) => setFieldValue("level", itemValue)}
                error={errors.level}
                touched={touched.level}
                styles={styles}
              />

              <SpellSchoolPicker
                value={values.school}
                onValueChange={(itemValue) =>
                  setFieldValue("school", itemValue)
                }
                error={errors.school}
                touched={touched.school}
                styles={styles}
              />

              <SpellSimpleInput
                label="Casting Time"
                placeholder="Casting Time"
                value={values.castingTime}
                onChangeText={handleChange("castingTime")}
                onBlur={handleBlur("castingTime")}
                error={errors.castingTime}
                touched={touched.castingTime}
                styles={styles}
                accessibilityLabel="Casting Time"
              />

              <SpellSimpleInput
                label="Range"
                placeholder="Range"
                value={values.spellRange}
                onChangeText={handleChange("spellRange")}
                onBlur={handleBlur("spellRange")}
                error={errors.spellRange}
                touched={touched.spellRange}
                styles={styles}
                accessibilityLabel="Spell Range"
              />

              <SpellSimpleInput
                label="Duration"
                placeholder="Duration"
                value={values.duration}
                onChangeText={handleChange("duration")}
                onBlur={handleBlur("duration")}
                error={errors.duration}
                touched={touched.duration}
                styles={styles}
                accessibilityLabel="Spell Duration"
              />

              <SpellDescriptionInput
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                error={errors.description}
                touched={touched.description}
                styles={styles}
              />

              <SpellComponentsCheckboxGroup
                values={values.components}
                setFieldValue={setFieldValue}
                error={errors.components as string}
                touched={touched.components}
                styles={styles}
              />

              <SpellHigherLevelsInput
                value={values.higherLevels ?? ""}
                onChangeText={handleChange("higherLevels")}
                onBlur={handleBlur("higherLevels")}
                styles={styles}
              />

              <Button
                title="Create Spell"
                onPress={handleSubmit as any}
                disabled={isSubmitting}
                accessibilityLabel="Create Spell Button"
                color="#4B7BE5"
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#4B7BE5",
    alignSelf: "center",
  },
  form: {
    width: "100%",
  },
  label: {
    marginBottom: 6,
    fontWeight: "bold",
    color: "#222",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 14,
    padding: 10,
    borderRadius: 8,
    color: "black",
    backgroundColor: "#fafbfc",
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 14,
    backgroundColor: "#fafbfc",
    overflow: "hidden",
    height: 52,
    justifyContent: "center",
  },
  picker: {
    color: "black",
    backgroundColor: "transparent",
    paddingHorizontal: 8,
    fontSize: 16,
    height: 52,
    textAlignVertical: "center",
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  textAreaSmall: {
    minHeight: 40,
    textAlignVertical: "top",
  },
  checkboxGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  checkboxContainer: {
    backgroundColor: "white",
    borderWidth: 0,
    padding: 0,
    margin: 0,
    marginRight: 16,
    marginBottom: 4,
    width: "auto",
  },
  checkboxText: {
    color: "#333",
    fontWeight: "500",
  },
  errorText: {
    color: "#e74c3c",
    marginBottom: 8,
    fontSize: 14,
  },
});
