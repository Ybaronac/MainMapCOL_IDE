import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';

const InfoCards = ({ title, text, icon, link }) => {
    return (
        <div className="w-full flex flex-col h-full rounded-xl overflow-hidden shadow-xl bg-[var(--component-bg)] border border-[var(--component-border)] transition-all duration-300 hover:shadow-2xl hover:border-[var(--accent)/30]">
            {icon && (
                <div className="p-10 lg:p-14 flex items-center justify-center bg-[var(--component-bg)] border-b border-[var(--component-border)]" style={{ padding: '0.625rem' }}>
                    <div className="text-[var(--accent)] scale-125 lg:scale-150">
                        {icon}
                    </div>
                </div>
            )}
            <div className="px-12 py-14 flex-grow flex flex-col justify-between" style={{ padding: '0.875rem 0.75rem' }}>
                <div>
                    <h3 className="font-bold text-2xl mb-4 text-[var(--title-color)] leading ­tight">
                        {title}
                    </h3>
                    <p className="text-[var(--text-color)] text-base leading-relaxed text-justify">
                        {text}
                    </p>
                </div>
            </div>
            {link && (
                <div className="px-10 pb-10 pt-6" style={{ padding: '0.375rem 0.625rem 0.625rem' }}>
                    {link.startsWith('http') ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[#60a5fa] text-white font-semibold py-4 px-8 rounded-full transition-all"
                        >
                            ver <ExternalLink className="w-4 h-4" />
                        </a>
                    ) : (
                        <Link
                            to={link}
                            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:bg-[#60a5fa] text-white font-semibold py-4 px-8 rounded-full transition-all"
                        >
                            ver
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

InfoCards.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.node,
    link: PropTypes.string,
};

export default InfoCards;
