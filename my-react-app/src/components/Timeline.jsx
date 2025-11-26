import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, School, Star, Award, MapPin } from 'lucide-react';
import WebpageContent from '../config/WebpageContent';

const Timeline = () => {
    return (
        <div className="timeline-container bg-gray-100 dark:bg-[#171717] p-8 rounded-lg">
            <div className="mb-2">
                <h2 className="text-3xl font-bold text-center mb-2 text-[#262626] dark:text-[#e5e5e5] pd">
                    {WebpageContent.history_title2}
                </h2>
            </div>
            <div className="mt-12">
                <VerticalTimeline className="custom-line">
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'var(--component-bg)', color: 'var(--text-color)' }}
                        contentArrowStyle={{ borderRight: '7px solid  var(--component-border)' }}
                        date={WebpageContent.history_title3}
                        iconStyle={{ background: '#fff', color: '#007ca8', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Briefcase />}
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
                        iconStyle={{ background: '#fff', color: '#532476', boxShadow: '0 0 0 4px var(--title-color)' }}
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
                        iconStyle={{ background: '#fff', color: '#ffc611', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Star />}
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
                        iconStyle={{ background: '#fff', color: '#9f318f', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<Award />}
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
                        iconStyle={{ background: '#fff', color: '#000e2a', boxShadow: '0 0 0 4px var(--title-color)' }}
                        icon={<MapPin />}
                    >
                        <p>
                            {WebpageContent.history_paragraph7}
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    );
};

export default Timeline;
