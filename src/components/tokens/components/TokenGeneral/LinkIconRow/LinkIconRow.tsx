import {
  BsTwitter,
  BsDiscord,
  BsTelegram,
  BsMedium,
  BsGithub,
  BsReddit,
  BsLink45Deg,
} from 'react-icons/bs';
import styles from './LinkIconRow.module.scss';
import { motion } from 'framer-motion';

type LinkItemPropTypes = {
  href: string;
  logo: any;
};

export default function LinkIconRow({ props }: any) {
  const twitterLink = {
    id: 'twitter',
    link: props.tokenMetadata[0].twitter,
  };
  const discordLink = {
    id: 'discord',
    link: props.tokenMetadata[0].discord[0],
  };
  const telegramLink = {
    id: 'telegram',
    link: props.tokenMetadata[0].telegram,
  };
  const mediumLink = {
    id: 'medium',
    link: props.tokenMetadata[0].medium[0],
  };
  const githubLink = {
    id: 'github',
    link: props.tokenMetadata[0].github[0],
  };
  const redditLink = {
    id: 'reddit',
    link: props.tokenMetadata[0].reddit,
  };
  const homepageLink = {
    id: 'homepage',
    link: props.tokenMetadata[0].homepage[0],
  };

  const linkArr = [
    twitterLink,
    discordLink,
    telegramLink,
    mediumLink,
    githubLink,
    redditLink,
    homepageLink,
  ];

  const LinkItem = ({ href, logo }: LinkItemPropTypes) => {
    return (
      <motion.div
        whileHover={{
          scale: 1.4,
        }}
      >
        <a
          className={styles.a_tag}
          href={href}
          target="_blank"
          rel="noreferrer"
        >
          {logo}
        </a>
      </motion.div>
    );
  };
  const LinkHandler = (): any => {
    return linkArr.map((item) => {
      console.log(item);
      return item.link !== '' && item.link !== undefined ? (
        item.id == 'twitter' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsTwitter size={24} color="var(--twitter-blue)" />}
          />
        ) : item.id == 'discord' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsDiscord size={24} color="var(--discord-purple)" />}
          />
        ) : item.id == 'telegram' ? (
          item.link !== 'https://t.me/' ? (
            <LinkItem
              key={item.id}
              href={item.link}
              logo={<BsTelegram size={24} color="var(--telegram-blue)" />}
            />
          ) : null
        ) : item.id == 'medium' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsMedium size={24} color="var(--black)" />}
          />
        ) : item.id == 'github' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsGithub size={24} color="var(--black)" />}
          />
        ) : item.id == 'reddit' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsReddit size={24} color="var(--reddit-red)" />}
          />
        ) : item.id == 'homepage' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsLink45Deg size={24} color="var(--black)" />}
          />
        ) : null
      ) : null;
    });
  };

  return (
    <div className={styles.link_container}>
      <LinkHandler />
    </div>
  );
}
