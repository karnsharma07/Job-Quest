import { ScrollView, Text } from "react-native";

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{job.title}</Text>
      <Text style={{ fontSize: 18, marginTop: 5 }}>{job.company_name}</Text>

      <Text style={{ marginTop: 20, lineHeight: 22 }}>
        {job.description}
      </Text>
    </ScrollView>
  );
}
