import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import InfoCards from './InfoCards';
import { Database, FileText, Users, Building2, BookOpen, Award } from 'lucide-react';

const Credits = () => (
    <div className="flex flex-col">
        <div className="pt-16 mb-20">
            <TitleHeader />
            <TextSection
                content={[
                    { type: 'title', text: WebpageContent.credits_title1 },
                    { type: 'paragraph', text: WebpageContent.credits_paragraph1 }
                ]}
            />
        </div>

        {/* Párrafo de contexto */}
        <div className="pb-2" style={{ paddingTop: '1.5rem' }}>
            <TextSection
                content={[
                    { type: 'paragraph', text: WebpageContent.credits_paragraph2 }
                ]}
                className="transparent-section"
            />
        </div>

        {/* Primera sección de InfoCards - Fuentes de Datos */}
        <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
            <div className="w-[85%] max-w-none mx-auto">
                <div
                    className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
                    style={{ gap: '1rem', padding: '1rem 0' }}
                >
                    <InfoCards
                        title={WebpageContent.credits_title2}
                        text={WebpageContent.credits_paragraph3}
                        icon={<Database className="w-20 h-20" />}
                    />
                    <InfoCards
                        title={WebpageContent.credits_title3}
                        text={WebpageContent.credits_paragraph4}
                        icon={<FileText className="w-20 h-20" />}
                    />
                    <InfoCards
                        title={WebpageContent.credits_title4}
                        text={WebpageContent.credits_paragraph5}
                        icon={<Building2 className="w-20 h-20" />}
                    />
                </div>
            </div>
        </div>

        {/* Párrafo de contexto */}
        <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
            <TextSection
                content={[
                    { type: 'paragraph', text: WebpageContent.credits_paragraph6 }
                ]}
                className="transparent-section"
            />
        </div>

        {/* Segunda sección de InfoCards - Instituciones y Colaboradores */}
        <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
            <div className="w-[85%] max-w-none mx-auto">
                <div
                    className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
                    style={{ gap: '1rem', padding: '1rem 0' }}
                >
                    <InfoCards
                        title={WebpageContent.credits_title5}
                        text={WebpageContent.credits_paragraph7}
                        icon={<Users className="w-20 h-20" />}
                    />
                    <InfoCards
                        title={WebpageContent.credits_title6}
                        text={WebpageContent.credits_paragraph8}
                        icon={<BookOpen className="w-20 h-20" />}
                    />
                    <InfoCards
                        title={WebpageContent.credits_title7}
                        text={WebpageContent.credits_paragraph9}
                        icon={<Award className="w-20 h-20" />}
                    />
                </div>
            </div>
        </div>

        {/* Párrafo final */}
        <div className="pb-2" style={{ paddingTop: '0.5rem' }}>
            <TextSection
                content={[
                    { type: 'paragraph', text: WebpageContent.credits_paragraph10 }
                ]}
                className="transparent-section"
            />
        </div>

    </div>
);

export default Credits;
