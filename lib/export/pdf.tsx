import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { Resume } from "@/lib/ai/schemas";
import React from "react";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10.5, fontFamily: "Helvetica", lineHeight: 1.4 },
  name: { fontSize: 20, textAlign: "center", fontFamily: "Helvetica-Bold" },
  contact: { fontSize: 10, textAlign: "center", marginTop: 4, color: "#444" },
  section: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 14,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
    paddingBottom: 2,
  },
  role: { fontFamily: "Helvetica-Bold" },
  meta: { fontStyle: "italic", color: "#555" },
  bullet: { marginLeft: 10, marginTop: 1 },
  summary: { marginTop: 4 },
});

function ResumeDoc({ resume }: { resume: Resume }) {
  const h = resume.header;
  const contact = [h.title, h.email, h.phone, h.location].filter(Boolean).join(" · ");
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{h.name}</Text>
        {contact ? <Text style={styles.contact}>{contact}</Text> : null}
        {h.links.length ? (
          <Text style={styles.contact}>{h.links.map((l) => `${l.label}: ${l.url}`).join(" · ")}</Text>
        ) : null}

        {resume.summary ? (
          <>
            <Text style={styles.section}>SUMMARY</Text>
            <Text style={styles.summary}>{resume.summary}</Text>
          </>
        ) : null}

        <Text style={styles.section}>EXPERIENCE</Text>
        {resume.experience.map((exp, i) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <Text>
              <Text style={styles.role}>{exp.title}</Text> — {exp.company}
              {exp.location ? ` (${exp.location})` : ""}{" "}
              <Text style={styles.meta}>
                {exp.startDate ?? ""}
                {exp.endDate ? `–${exp.endDate}` : ""}
              </Text>
            </Text>
            {exp.bullets.map((b, j) => (
              <Text key={j} style={styles.bullet}>
                • {b}
              </Text>
            ))}
          </View>
        ))}

        {resume.education.length ? (
          <>
            <Text style={styles.section}>EDUCATION</Text>
            {resume.education.map((ed, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text>
                  <Text style={styles.role}>{ed.school}</Text>
                  {ed.degree || ed.field ? ` — ${[ed.degree, ed.field].filter(Boolean).join(", ")}` : ""}{" "}
                  <Text style={styles.meta}>
                    {ed.startDate ?? ""}
                    {ed.endDate ? `–${ed.endDate}` : ""}
                  </Text>
                </Text>
                {ed.details.map((d, j) => (
                  <Text key={j} style={styles.bullet}>
                    • {d}
                  </Text>
                ))}
              </View>
            ))}
          </>
        ) : null}

        {resume.skills.length ? (
          <>
            <Text style={styles.section}>SKILLS</Text>
            <Text>{resume.skills.join(", ")}</Text>
          </>
        ) : null}

        {resume.projects.length ? (
          <>
            <Text style={styles.section}>PROJECTS</Text>
            {resume.projects.map((p, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text>
                  <Text style={styles.role}>{p.name}</Text>
                  {p.url ? ` — ${p.url}` : ""}
                </Text>
                <Text>{p.description}</Text>
              </View>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
}

export async function renderResumePdf(resume: Resume): Promise<Buffer> {
  return renderToBuffer(<ResumeDoc resume={resume} />);
}
