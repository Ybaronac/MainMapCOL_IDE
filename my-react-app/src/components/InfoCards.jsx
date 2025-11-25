import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import PropTypes from 'prop-types';

const InfoCards = ({ title, text, icon, link }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[var(--component-bg)] border border-[var(--component-border)] h-full flex flex-col p-2">
            {icon && (
                <div className="w-full h-48 flex items-center justify-center bg-[var(--component-bg)] border-b border-[var(--component-border)]">
                    <div className="text-[var(--accent)] transform scale-150">
                        {icon}
                    </div>
                </div>
            )}
            <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2 text-[var(--title-color)]">
                    {title}
                </div>
                <p className="text-[var(--text-color)] text-base text-justify">
                    {text}
                </p>
            </div>
            {link && (
                <div className="px-6 pt-4 pb-4 border-t border-[var(--component-border)] bg-[var(--component-bg)]">
                    {link.startsWith('http') ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[var(--accent)] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:opacity-90 transition-opacity"
                        >
                            Learn more <ExternalLink className="inline ml-1 w-3 h-3" />
                        </a>
                    ) : (
                        <Link
                            to={link}
                            className="inline-block bg-[var(--accent)] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 hover:opacity-90 transition-opacity"
                        >
                            Learn more
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
