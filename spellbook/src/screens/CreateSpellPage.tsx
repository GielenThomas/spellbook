import React from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  SpellLevelEnum,
  SchoolEnum,
  ComponentEnum,
  Spell,
} from "../../utils/spellType.ts";
import { CheckBox } from "react-native-elements";
import { v4 as uuidv4 } from "uuid";

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
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f4f4f4" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
                id: uuidv4(),
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
              console.log(values);
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
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                  placeholderTextColor="#888"
                  accessibilityLabel="Spell Name"
                  autoCapitalize="words"
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <Text style={styles.label}>Level</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={values.level}
                    onValueChange={(itemValue) =>
                      setFieldValue("level", itemValue)
                    }
                    style={styles.picker}
                    accessibilityLabel="Spell Level"
                  >
                    <Picker.Item label="Select Level..." value="" />
                    {Object.entries(SpellLevelEnum).map(([key, value]) => (
                      <Picker.Item key={key} label={value} value={value} />
                    ))}
                  </Picker>
                </View>
                {touched.level && errors.level && (
                  <Text style={styles.errorText}>{errors.level}</Text>
                )}

                <Text style={styles.label}>School</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={values.school}
                    onValueChange={(itemValue) =>
                      setFieldValue("school", itemValue)
                    }
                    style={styles.picker}
                    accessibilityLabel="Spell School"
                  >
                    <Picker.Item label="Select School..." value="" />
                    {Object.entries(SchoolEnum).map(([key, value]) => (
                      <Picker.Item key={key} label={value} value={value} />
                    ))}
                  </Picker>
                </View>
                {touched.school && errors.school && (
                  <Text style={styles.errorText}>{errors.school}</Text>
                )}

                <Text style={styles.label}>Casting Time</Text>
                <TextInput
                  placeholder="Casting Time"
                  style={styles.input}
                  onChangeText={handleChange("castingTime")}
                  onBlur={handleBlur("castingTime")}
                  value={values.castingTime}
                  placeholderTextColor="#888"
                  accessibilityLabel="Casting Time"
                />
                {touched.castingTime && errors.castingTime && (
                  <Text style={styles.errorText}>{errors.castingTime}</Text>
                )}

                <Text style={styles.label}>Range</Text>
                <TextInput
                  placeholder="Range"
                  style={styles.input}
                  onChangeText={handleChange("spellRange")}
                  onBlur={handleBlur("spellRange")}
                  value={values.spellRange}
                  placeholderTextColor="#888"
                  accessibilityLabel="Spell Range"
                />
                {touched.spellRange && errors.spellRange && (
                  <Text style={styles.errorText}>{errors.spellRange}</Text>
                )}

                <Text style={styles.label}>Duration</Text>
                <TextInput
                  placeholder="Duration"
                  style={styles.input}
                  onChangeText={handleChange("duration")}
                  onBlur={handleBlur("duration")}
                  value={values.duration}
                  placeholderTextColor="#888"
                  accessibilityLabel="Spell Duration"
                />
                {touched.duration && errors.duration && (
                  <Text style={styles.errorText}>{errors.duration}</Text>
                )}

                <Text style={styles.label}>Description</Text>
                <TextInput
                  placeholder="Description"
                  style={[styles.input, styles.textArea]}
                  multiline
                  numberOfLines={4}
                  onChangeText={handleChange("description")}
                  onBlur={handleBlur("description")}
                  value={values.description}
                  placeholderTextColor="#888"
                  accessibilityLabel="Spell Description"
                />
                {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}

                <Text style={styles.label}>Components</Text>
                <View style={styles.checkboxGroup}>
                  {Object.entries(ComponentEnum).map(([key, value]) => (
                    <CheckBox
                      key={key}
                      title={value}
                      checked={values.components.includes(value)}
                      onPress={() => {
                        if (values.components.includes(value)) {
                          setFieldValue(
                            "components",
                            values.components.filter((v: string) => v !== value)
                          );
                        } else {
                          setFieldValue("components", [
                            ...values.components,
                            value,
                          ]);
                        }
                      }}
                      containerStyle={styles.checkboxContainer}
                      textStyle={styles.checkboxText}
                      accessibilityLabel={`Component ${value}`}
                    />
                  ))}
                </View>
                {touched.components && errors.components && (
                  <Text style={styles.errorText}>
                    {errors.components as string}
                  </Text>
                )}

                <Text style={styles.label}>At Higher Levels (optional)</Text>
                <TextInput
                  placeholder="At Higher Levels (optional)"
                  style={[styles.input, styles.textAreaSmall]}
                  multiline
                  numberOfLines={2}
                  onChangeText={handleChange("higherLevels")}
                  onBlur={handleBlur("higherLevels")}
                  value={values.higherLevels}
                  placeholderTextColor="#888"
                  accessibilityLabel="At Higher Levels"
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
    </KeyboardAvoidingView>
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
    height: 52, // Match wrapper height
    textAlignVertical: "center", // Center text vertically (Android only)
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
