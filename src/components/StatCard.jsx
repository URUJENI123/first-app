import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const StatCard = ({ title, value, subtitle, style }) => {
  return (
    <Card style={[styles.card, style]}>
      <Card.Content style={styles.content}>
        <Title style={styles.value}>{value}</Title>
        <Paragraph style={styles.title}>{title}</Paragraph>
        {subtitle && <Paragraph style={styles.subtitle}>{subtitle}</Paragraph>}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 2,
  },
  content: {
    alignItems: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6200EE",
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#999",
  },
});

export default StatCard;
