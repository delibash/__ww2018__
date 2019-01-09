import * as React from 'react';
// import { SkillInsight } from './../../types/domainTypes';
import { Employment, Education, Skill } from './../../types/domainTypes';
import { InsightIcon } from './../svg/svgObj';
import * as btnStyles from './../buttons/buttons.css';
import * as styles from './details.css';
import * as moment from 'moment';
const titleCase = require('title-case');

interface SectionProps {
  header?: string | any;
  content: any;
}

interface ExperienceProps {
  workHistory: Array<Employment>;
}

interface EducationProps {
  educationHistory: Array<Education>;
}

interface SkillsProps {
  skills: Array<Skill>;
}

const compareEmploymentDates = (a: Employment, b: Employment): number => {
  if (a.current && b.current) {
    return 0;
  }

  if (a.current && !b.current) {
    return -1;
  }

  if (!a.current && b.current) {
    return 1;
  }

  // neither is current
  if (!a.current && !b.current) {
    if (a.duration && b.duration) {
      const [ad, bd] = [a.duration, b.duration];
      if (ad.endDate && bd.endDate) {
        return bd.endDate - ad.endDate;
      }

      if (ad.endDate && !bd.endDate) {
        return -1;
      }

      if (!ad.endDate && bd.endDate) {
        return 1;
      }
    }
  }

  return 0;
};

export const Section = ({ header, content }: SectionProps) => (
  <div className={styles.section}>
    {header ? <h4>{header}</h4> : ''}
    {content}
  </div>
);

export const Current = ({ title, company, duration }: any) => (
  <div>
    <p>
      <span>{title}</span>
      <span className={styles.light}>at</span>
      <span>{company}</span>
    </p>
    <p>{duration}</p>
  </div>
);

export const Experience = ({ workHistory }: ExperienceProps) => {
  return (
    <ul className={styles.experience}>
      {workHistory && workHistory.sort(compareEmploymentDates).map((exp: Employment, i: number) => {
        const { title, company, insight } = exp;
        const { startDate } = exp.duration;
        const endDate = exp.duration.endDate
          ? exp.duration.endDate
          : exp.current ? Date.now() : null;

        const time = startDate && endDate
          ? moment.duration(endDate - startDate, 'ms').humanize()
          : 'unknown';

        const parsedStart = startDate ? moment(startDate).format('YYYY') : 'unknown';
        const parsedEnd = endDate ? moment(endDate).format('YYYY') : 'unknown';

        return (
          <li key={i}>
            <div style={{ flex: 1 }}>
              <p>
                <strong>{parsedStart}&nbsp;&mdash;&nbsp;{parsedEnd}</strong>
              </p>
              <p>
                <span>{title}</span>
                <span className={styles.light}>at</span>
                <span>{company.name}</span>
                <span className={styles.light}>{time}</span>
              </p>
            </div>
            {
              insight ?
                <div style={{ flex: 1.5 }}>
                  {/* map to insight array */}
                  <p className={`${styles.experienceMsg} blue-border`}>
                    {insight}
                  </p>
                </div>
                :
                ''
            }
          </li>
        );
      })}
    </ul>
  );
};

export const EducationHistory = ({ educationHistory }: EducationProps) => (
  <ul>
    {educationHistory && educationHistory.map((edu: Education, i: number) => {
      const { school, degree, duration: { endDate } } = edu;
      const parsedEnd = endDate ? moment(endDate).format('YYYY') : 'unknown';
      return (
        <li key={i}>
          <p>
            <strong>{parsedEnd}</strong>
            <strong>&nbsp;&mdash;&nbsp;</strong>
            <strong>{titleCase(degree)}</strong>
            <span className={styles.light}>at</span>
            <span>{school}</span>
          </p>
        </li>
      );
    })}
  </ul>
);

// const renderInsight = ({ insight, present }: SkillInsight) => {
//   const style = present
//     ? `${styles.skillInsightPresent} blue-border`
//     : `${styles.skillInsightNotPresent} red-border`;

//   return <li className={style} key={Math.random()}>{insight}</li>;
// };

export const Skills = ({ skills }: SkillsProps) => (
  <ul className={styles.skills}>
    {skills && skills.map((skill: Skill, i: number) => {
      const { name } = skill;
      // const renderedInsights = insights && insights.map(renderInsight);
      const btn =
        (
          <span
            className={btnStyles.btnPill}
            style={skill.hasSkill !== undefined && !skill.hasSkill ? { borderColor: '#CC1D66' } : {}}
          >
            {titleCase(name)}
          </span>);

      return (
        <li key={i} className={styles.skillPill}>
          <span>{btn}</span>
          {/* <ul className={styles.skillPillInsights}>{renderedInsights}</ul> */}
        </li>
      );
    })}
  </ul>
);

export const Insights = ({ insights }: any) => (
  <ul>
    {insights && insights.map((v: any, i: number) => {
      return (
        <li key={i} className={styles.insight}>
          <span><InsightIcon /></span>
          <span>{v}</span>
        </li>
      );
    })}
  </ul>
);

export const Highlights = ({ highlights }: any) => (
  <ul>
    {highlights && highlights.map((v: any, i: number) => {
      return (
        <li key={i} className={styles.detailsText} style={{ display: 'flex' }}>
          <h4 style={{ flex: 1, paddingRight: '2rem' }}>{v.header}</h4>
          <p
            style={{ flex: 1.5, display: 'flex', alignItems: 'center', paddingRight: '2rem', marginRight: '4rem', paddingTop: '1rem', paddingBottom: '1rem', backgroundColor: 'var(--lightestGray)' }}
            className="green-border"
          >
            {v.text}
          </p>
        </li>
      );
    })}
  </ul>
);

export const Pills = ({ content }: any) => (
  <ul style={{display: 'flex', flexWrap: 'wrap'}}>
    {console.log('content: ', content)}
    {content && content.map((v: any) => {
      const { items } = v;
      return (
        <>
          {items.map((z: any, j: number) => {
            const { hasSkill, name } = z;
            return (
              <li key={j} style={{ marginRight: '1.2rem', marginBottom: '1.8rem' }}>
                <div className={btnStyles.btnPill} style={!hasSkill ? { borderColor: '#CC1D66' } : {}}>{name}</div>
              </li>
            );
          })}
        </>
      );
    })}
  </ul>
);

export const Brief = ({ text }: any) => (
  <p className={styles.light}>{text}</p>
);
