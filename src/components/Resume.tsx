import { Certificates } from "@/lib/Certificates";
import { fullName, homePara, title, maxWorkExperienceCount, maxProjectsCount, maxCertificatesCount, maxSkillsCount, maxPublicationsCount } from "@/lib/Data";
import { education } from "@/lib/Education";
import { experience } from "@/lib/Experience";
import { links } from "@/lib/header";
import { data } from "@/lib/projectId";
import projects from "@/lib/Projects";
import { nameless, skills, top3 } from "@/lib/Skills";
import { Publications } from "@/lib/Publications";
import React from "react";
import DateDisplay from "./DateDisplay";



const resumeStyles = `
    .resume-container {
        font-family: "Times New Roman", serif;
        margin: 0;
        padding: 0;
        width: 21cm;
        min-height: 29.7cm;
        padding: 1.5cm;
        box-sizing: border-box;
        font-size: 12px;
        margin-top: 0;
        background-color: white;
        color: black;
    }
    .resume-container h1, .resume-container h2, .resume-container h3 {
        margin: 0;
        padding: 0;
    }
    .resume-container h1 {
        font-size: 25px;
        text-transform: uppercase;
        margin-bottom: 2px;
        font-weight: bold;
    }
    .resume-container h3 {
        font-size: 15px;
        margin-bottom: 5px;
        font-weight: normal;
    }
    .resume-container h2 {
        font-size: 15px;
        text-transform: uppercase;
        margin: 0;
        font-weight: bold;
    }
    .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
    }
    .name-section {
        text-align: left;
    }
    .contact-info {
        text-align: right;
        font-size: 10px;
        line-height: 1.5;
    }
    .section {
        margin-bottom: 15px;
    }
    .section-title {
        display: table;
        width: 100%;
        border-top: 1px solid #ddd;
        border-bottom: 2px solid #333;
        background-color: #fff;
        padding: 8px 0 0 0;
        margin-bottom: 5px;
    }
    .entry {
        margin-bottom: -3px;
    }
    .job-title, .degree-info {
        font-weight: bold;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2px;
    }
    .location, .institution {
        font-size: 11px;
        margin-top: 2px;
        margin-bottom: 5px;
    }
    .resume-container ul {
        margin: 5px 0;
        padding-left: 20px;
        list-style-type: disc;
    }
    .skills-list {
        margin: 12px 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 4px 20px;
        padding-left: 20px;
        list-style-type: disc;
    }
    .skills-list li {
        margin-bottom: 0;
    }
    .certifications-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px 20px;
        margin-top: 0;
        margin-bottom: -3px;
    }
    .certification-item {
        font-size: 11px;
        margin-bottom: 3px;
    }
    .certification-name {
        font-weight: bold;
    }
    @media print {
        .resume-container {
            margin-top: -1.5cm;
        }
    }
`;

const Resume = React.forwardRef<HTMLDivElement>((props, ref) => {
    const email = links.find((l) => l.text === "Email")?.href;
    const linkedin = links.find((l) => l.text === "LinkedIn")?.href;

    const allSkills = [
        ...top3.map((s) => s.title),
        ...skills.map((s) => s.name),
        ...nameless.map((s) => s.title),
    ];

    return (
        <>
            <style>{resumeStyles}</style>
            <div ref={ref} className="resume-container">
                <div className="header">
                    <div className="name-section">
                        <h1>{fullName}</h1>
                        <h3>{title}</h3>
                    </div>
                    <div className="contact-info">
                        <span>{email}</span>
                        <br />
                        <span>https://www.shaadqrsh.in</span>
                        <br />
                        <span>{linkedin?.replace("https://", "")}</span>
                        <br />
                    </div>
                </div>

                <div className="section">
                    <div className="section-title">
                        <h2>PROFESSIONAL SUMMARY</h2>
                    </div>
                    <p style={{ marginTop: "2px" }}>{homePara}</p>
                </div>


                {maxWorkExperienceCount > 0 && (
                    <div className="section">
                        <div className="section-title">
                            <h2>WORK EXPERIENCE</h2>
                        </div>
                        {experience.slice(0, maxWorkExperienceCount).map((exp, idx) => (
                            <div key={idx} className="entry">
                                <p className="job-title">
                                    {exp.title} <span><DateDisplay date={exp.startDate} endDate={exp.endDate} inProgress={exp.inProgress} /></span>
                                </p>
                                <p className="location">Various Clients</p>
                                <ul>
                                    {Array.isArray(exp.subtitle) ? (
                                        exp.subtitle.map((sub, subIdx) => <li key={subIdx}>{sub}</li>)
                                    ) : (
                                        <li>{exp.subtitle}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {maxProjectsCount > 0 && (
                    <div className="section">
                        <div className="section-title">
                            <h2>PROJECTS</h2>
                        </div>
                        {projects.slice(0, maxProjectsCount).map((proj, idx) => (
                            <div key={idx} className="entry">
                                <p className="job-title">
                                    {proj.title} <span><DateDisplay date={data[proj.url]?.date} /></span>
                                </p>
                                <ul>
                                    <li>{proj.desc}</li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                <div className="section">
                    <div className="section-title">
                        <h2>EDUCATION</h2>
                    </div>
                    {education.map((edu, idx) => (
                        <div key={idx} className="entry">
                            <p className="degree-info">
                                {edu.title} <span><DateDisplay date={edu.startDate} endDate={edu.endDate} inProgress={edu.inProgress} /></span>
                            </p>
                            <p className="institution">
                                {Array.isArray(edu.subtitle)
                                    ? edu.subtitle.join(", ")
                                    : edu.subtitle}
                                {edu.grade && (
                                    <>
                                        <b>&ensp;●&ensp;{edu.grade}</b>
                                    </>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                {maxPublicationsCount > 0 && (
                    <div className="section">
                        <div className="section-title">
                            <h2>PUBLICATIONS</h2>
                        </div>
                        <div className="certifications-grid">
                            {Publications.slice(0, maxPublicationsCount).map((pub, idx) => (
                                <div key={idx} className="certification-item">
                                    <span className="certification-name">{pub.name}</span>
                                    <br />
                                    <span>{pub.publishing} ● <DateDisplay date={pub.date} /></span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {maxCertificatesCount > 0 && (
                    <div className="section">
                        <div className="section-title">
                            <h2>CERTIFICATIONS</h2>
                        </div>
                        <div className="certifications-grid">
                            {Certificates.slice(0, maxCertificatesCount).map((cert, idx) => (
                                <div key={idx} className="certification-item">
                                    <span className="certification-name">{cert.title}</span>
                                    <br />
                                    <span>{cert.subtitle} ● <DateDisplay date={cert.date} /></span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {maxSkillsCount > 0 && (
                    <div className="section">
                        <div className="section-title">
                            <h2>SKILLS</h2>
                        </div>
                        <ul className="skills-list">
                            {allSkills.slice(0, maxSkillsCount).map((skill, idx) => (
                                <li key={idx}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
});

Resume.displayName = "Resume";

export default Resume;
