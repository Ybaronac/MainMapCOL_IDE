import React from 'react';
import { Link } from 'react-router-dom';
import WebpageContent from '../config/WebpageContent';
import TextSection from './TextSection';
import TitleHeader from './TitleHeader.jsx';
import InfoCards from './InfoCards';
import { BookOpen, FileText, BarChart2, Globe, Database, HelpCircle } from 'lucide-react';

const Resources = () => (
  <>
    <div className="flex flex-col">
      <div className="pt-16 mb-32">
        <TitleHeader />
        <TextSection
          content={[
            { type: 'title', text: WebpageContent.resources_title1 },
            { type: 'paragraph', text: WebpageContent.resources_paragraph1 }
          ]}
        />
      </div>

      <div className="pb-16" style={{ marginTop: '1rem', paddingTop: '1rem' }}>
        <div className="w-[85%] max-w-none mx-auto">
          <div
            className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
            style={{ gap: '2rem', padding: '2rem 0' }}
          >
            <InfoCards
              title={WebpageContent.resources_title2}
              text={WebpageContent.resources_paragraph2}
              icon={<BookOpen className="w-20 h-20" />}
              link="/resources/guide"
            />
            <InfoCards
              title={WebpageContent.resources_title3}
              text={WebpageContent.resources_paragraph3}
              icon={<FileText className="w-20 h-20" />}
            />
            <InfoCards
              title={WebpageContent.resources_title4}
              text={WebpageContent.resources_paragraph4}
              icon={<BarChart2 className="w-20 h-20" />}
            />
            <InfoCards
              title={WebpageContent.resources_title5}
              text={WebpageContent.resources_paragraph5}
              icon={<Globe className="w-20 h-20" />}
              link="https://www.dane.gov.co"
            />
            <InfoCards
              title={WebpageContent.resources_title6}
              text={WebpageContent.resources_paragraph6}
              icon={<Database className="w-20 h-20" />}
            />
            <InfoCards
              title={WebpageContent.resources_title7}
              text={WebpageContent.resources_paragraph7}
              icon={<HelpCircle className="w-20 h-20" />}
            />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Resources;
