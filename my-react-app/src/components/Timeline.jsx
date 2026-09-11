import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Lightbulb, School, Rocket, Users, Globe, BookOpen } from 'lucide-react';
import WebpageContent from '../config/WebpageContent';

const Timeline = () => {
    return (
        <div className="timeline-container bg-gray-100 dark:bg-[#171717] p-8 rounded-lg">
            <div className="timeline-title-wrapper" style={{ marginBottom: '0.8rem', paddingBottom: '0.4rem', textAlign: 'center' }}>
                <h2 className="text-3xl font-bold text-[#262626] dark:text-[#d4d4d4] pd">
                    {WebpageContent.history_title2}
                </h2>
            </div>
            <div style={{ marginTop: '0.7rem', paddingTop: '0.5rem' }}>
                <VerticalTimeline className="custom-line">
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--component-border)' }}
                        date={WebpageContent.history_title3}
                        iconStyle={{ background: '#fff', color: '#0284c7', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Lightbulb />}
                    >
                        <p>
                            {WebpageContent.history_paragraph3}
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--component-border)' }}
                        date={WebpageContent.history_title4}
                        iconStyle={{ background: '#fff', color: '#7c3aed', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<School />}
                    >
                        <p>
                            {WebpageContent.history_paragraph4}
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--component-border)' }}
                        date={WebpageContent.history_title5}
                        iconStyle={{ background: '#fff', color: '#eab308', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Rocket />}
                    >
                        <p>
                            {WebpageContent.history_paragraph5}
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--component-border)' }}
                        date={WebpageContent.history_title6}
                        iconStyle={{ background: '#fff', color: '#db2777', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Users />}
                    >
                        <p>
                            {WebpageContent.history_paragraph6}
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--accent)' }}
                        date={WebpageContent.history_title7}
                        iconStyle={{ background: '#fff', color: '#059669', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Globe />}
                    >
                        <p>
                            {WebpageContent.history_paragraph7}
                        </p>
                    </VerticalTimelineElement>

                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)', border: '1px solid var(--component-border)' }}
                        contentArrowStyle={{ borderRight: '7px solid var(--accent)' }}
                        date={WebpageContent.history_title8}
                        iconStyle={{ background: '#fff', color: '#dc2626', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<BookOpen />}
                    >
                        <p>
                            {WebpageContent.history_paragraph8}
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default Timeline;
