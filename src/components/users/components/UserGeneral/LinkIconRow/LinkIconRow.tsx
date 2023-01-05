import {
  BsTwitter,
  BsDiscord,
  BsTelegram,
  BsMedium,
  BsGithub,
  BsReddit,
  BsLink45Deg,
  BsYoutube,
  BsInstagram,
} from 'react-icons/bs';
import styles from './LinkIconRow.module.scss';
import { motion } from 'framer-motion';
import { FaTiktok } from 'react-icons/fa';

type LinkItemPropTypes = {
  href: string;
  logo: any;
};

export default function LinkIconRow({ props }: any) {
  // const bioLink1 = {
  //   id: 'bioLink1',
  //   link: props.user[0]?.links.bio_link_1,
  // };
  const twitterLink = {
    id: 'twitter',
    link: props.user[0]?.links.twitter_link,
  };
  // const discordLink = {
  //   id: 'discord',
  //   link: props.user[0]?.links.discord_link,
  // };
  const youtubeLink = {
    id: 'youtube',
    link: props.user[0]?.links.twitter_link,
  };
  const telegramLink = {
    id: 'telegram',
    link: props.user[0]?.links.telegram_link,
  };
  const instagramLink = {
    id: 'instagram',
    link: props.user[0]?.links.twitter_link,
  };
  const tikTokLink = {
    id: 'tiktok',
    link: props.user[0]?.links.twitter_link,
  };
  const redditLink = {
    id: 'reddit',
    link: props.user[0]?.links.twitter_link,
  };

  const linkArr = [
    // bioLink1,
    twitterLink,
    // discordLink,
    youtubeLink,
    telegramLink,
    instagramLink,
    tikTokLink,
    redditLink,
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
      return item.link !== '' && item.link !== undefined ? (
        item.id == 'twitter' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsTwitter size={24} color="var(--twitter-blue)" />}
          />
        ) : item.id == 'youtube' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsYoutube size={24} color="var(--youtube-red)" />}
          />
        ) : item.id == 'telegram' ? (
          item.link !== 'https://t.me/' ? (
            <LinkItem
              key={item.id}
              href={item.link}
              logo={<BsTelegram size={24} color="var(--telegram-blue)" />}
            />
          ) : null
        ) : item.id == 'instagram' ? (
          item.link !== 'https://t.me/' ? (
            <LinkItem
              key={item.id}
              href={item.link}
              logo={<BsInstagram size={24} fill="var(--instagram-color)" />}
            />
          ) : null
        ) : item.id == 'tiktok' ? (
          item.link !== 'https://t.me/' ? (
            <LinkItem
              key={item.id}
              href={item.link}
              logo={<FaTiktok size={24} fill="var(--tiktok-black)" />}
            />
          ) : null
        ) : item.id == 'reddit' ? (
          <LinkItem
            key={item.id}
            href={item.link}
            logo={<BsReddit size={24} color="var(--reddit-red)" />}
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
