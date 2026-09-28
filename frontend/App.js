import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompetition();
  }, []);

  // Get competition directly from backend
  const fetchCompetition = async () => {
    try {
      const response = await fetch(
  "http://192.168.1.4:5000/api/competitions"
);
      
      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (data.success && data.data.length > 0) {
        setCompetition(data.data[0]);
      } else {
        setError("Competition not found");
      }
    } catch (err) {
      console.log("FETCH ERROR:", err.message);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#087F7B"
        />

        <Text style={styles.loadingText}>
          Loading competition...
        </Text>
      </SafeAreaView>
    );
  }

  // Error screen
  if (error || !competition) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>
          {error || "Competition not found"}
        </Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchCompetition}
        >
          <Text style={styles.retryText}>
            Retry
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const spotsRemaining =
    competition.maxParticipants -
    competition.participantCount;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.back}>‹</Text>

          <Text style={styles.headerTitle}>
            Competition Details
          </Text>

          <Text style={styles.language}>
            EN
          </Text>
        </View>

        {/* Competition Card */}
        <View style={styles.card}>

          <Text style={styles.category}>
            {competition.category} • {competition.type}
          </Text>

          <Text style={styles.title}>
            {competition.title}
          </Text>

          <Text style={styles.description}>
            {competition.description}
          </Text>

          <View style={styles.infoRow}>

            <View style={styles.infoBox}>
              <Text style={styles.label}>
                Prize Pool
              </Text>

              <Text style={styles.value}>
                ₹{competition.prizePool}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>
                Entry Fee
              </Text>

              <Text style={styles.value}>
                ₹{competition.entryFee}
              </Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>
                Spots Left
              </Text>

              <Text style={styles.value}>
                {spotsRemaining}
              </Text>
            </View>

          </View>
        </View>

        {/* Judge */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Judge
          </Text>

          <Text style={styles.judgeName}>
            {competition.judge?.name}
          </Text>

          <Text style={styles.judgeProfession}>
            {competition.judge?.profession}
          </Text>

          <Text style={styles.experience}>
            {competition.judge?.experience}
          </Text>

        </View>

        {/* Important Dates */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Important Dates
          </Text>

          <DateRow
            label="Register Before"
            date={competition.registrationDeadline}
          />

          <DateRow
            label="Submission Starts"
            date={competition.submissionStart}
          />

          <DateRow
            label="Submission Ends"
            date={competition.submissionEnd}
          />

          <DateRow
            label="Result Date"
            date={competition.resultDate}
          />

        </View>

        {/* Rewards */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            Rewards
          </Text>

          {competition.rewards?.map((reward) => (
            <View
              key={reward._id || reward.position}
              style={styles.rewardRow}
            >

              <Text style={styles.rewardPosition}>
                #{reward.position}
              </Text>

              <Text style={styles.rewardTitle}>
                {reward.title}
              </Text>

              <Text style={styles.rewardAmount}>
                ₹{reward.amount}
              </Text>

            </View>
          ))}

        </View>

        {/* About */}
        <View style={styles.card}>

          <Text style={styles.sectionTitle}>
            About Competition
          </Text>

          <Text style={styles.bodyText}>
            {competition.description}
          </Text>

        </View>

        {/* Temporary Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            console.log(
              "Competition ID:",
              competition._id
            );
          }}
        >
          <Text style={styles.registerText}>
            Register – ₹{competition.entryFee}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}


// Date Row Component
function DateRow({ label, date }) {
  const formattedDate = new Date(
    date
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={styles.dateRow}>

      <Text style={styles.dateLabel}>
        {label}
      </Text>

      <Text style={styles.dateValue}>
        {formattedDate}
      </Text>

    </View>
  );
}


// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F6FAF9",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6FAF9",
  },

  loadingText: {
    marginTop: 10,
    color: "#555",
  },

  error: {
    color: "#D32F2F",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },

  retryButton: {
    marginTop: 15,
    backgroundColor: "#087F7B",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryText: {
    color: "#fff",
    fontWeight: "bold",
  },

  header: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },

  back: {
    fontSize: 34,
    color: "#222",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  language: {
    fontSize: 13,
    fontWeight: "700",
    color: "#087F7B",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    elevation: 2,
  },

  category: {
    color: "#087F7B",
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    marginTop: 7,
    color: "#172121",
  },

  description: {
    marginTop: 10,
    color: "#666",
    lineHeight: 21,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  infoBox: {
    flex: 1,
  },

  label: {
    fontSize: 12,
    color: "#777",
  },

  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "800",
    color: "#087F7B",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#222",
    marginBottom: 14,
  },

  judgeName: {
    fontSize: 18,
    fontWeight: "700",
  },

  judgeProfession: {
    marginTop: 5,
    color: "#087F7B",
    fontWeight: "600",
  },

  experience: {
    marginTop: 5,
    color: "#666",
  },

  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  dateLabel: {
    color: "#666",
  },

  dateValue: {
    fontWeight: "700",
    color: "#222",
  },

  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  rewardPosition: {
    width: 40,
    fontWeight: "800",
    color: "#087F7B",
  },

  rewardTitle: {
    flex: 1,
    fontWeight: "600",
  },

  rewardAmount: {
    fontWeight: "800",
  },

  bodyText: {
    color: "#666",
    lineHeight: 22,
  },

  registerButton: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: "#087F7B",
    paddingVertical: 17,
    borderRadius: 14,
    alignItems: "center",
  },

  registerText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

});