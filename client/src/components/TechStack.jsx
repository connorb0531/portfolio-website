import { Icon } from '@iconify/react';
import pythonIcon from '@iconify-icons/logos/python';
import javaIcon from '@iconify-icons/logos/java';
import postgresqlIcon from '@iconify-icons/logos/postgresql';
import javascriptIcon from '@iconify-icons/logos/javascript';
import html5Icon from '@iconify-icons/logos/html-5';
import css3Icon from '@iconify-icons/logos/css-3';
import reactIcon from '@iconify-icons/logos/react';
import springIcon from '@iconify-icons/logos/spring-icon';
import nodejsIcon from '@iconify-icons/logos/nodejs-icon';
import expressIcon from '@iconify-icons/logos/express';
import mongodbIcon from '@iconify-icons/logos/mongodb-icon';
import gitIcon from '@iconify-icons/logos/git-icon';

export default function TechStack() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
            <Icon icon={javaIcon} width="48" height="48" title="Java" />
            <Icon icon={pythonIcon} width="48" height="48" title="Python" />
            <Icon icon={postgresqlIcon} width="48" height="48" title="PostgreSQL" />
            <Icon icon={javascriptIcon} width="48" height="48" title="JavaScript" />
            <Icon icon={html5Icon} width="48" height="48" title="HTML5" />
            <Icon icon={css3Icon} width="48" height="48" title="CSS3" />
            <Icon icon={reactIcon} width="48" height="48" title="React" />
            <Icon icon={springIcon} width="48" height="48" title="Spring Boot" />
            <Icon icon={nodejsIcon} width="48" height="48" title="Node.js" />
            <Icon icon={expressIcon} width="48" height="48" title="Express.js" />
            <Icon icon={mongodbIcon} width="48" height="48" title="MongoDB" />
            <Icon icon={gitIcon} width="48" height="48" title="Git" />
        </div>
    );
}
