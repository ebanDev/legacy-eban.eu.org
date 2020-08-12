---
title: AdGuard Home : La sécurité et la vie privée dans votre maison 🛡️
keywords: [AdGuard, privacy, adblock, network wide adblock, eban]
description: Dans ce nouvel article, nous allons traiter du logiciel open-source AdGuard Home qui est un bloqueur de publicités et de trackers qui intègre des fonctions supplémentaires telles que le DOH qui permet de chiffrer les requêtes DNS de votre réseau Wi-Fi !
url: https://blog.eban.dev/tutos/adguard-home-la-securite-et-la-vie-privee-dans-votre-maison
image: https://teqqy.de/wp-content/uploads/2019/01/adguard-home-dashboard-1180x590.jpg
...

# AdGuard Home, La sécurité et la vie privée dans votre maison 🛡️

Dans ce nouvel article, nous allons traiter du logiciel open-source AdGuard Home qui est un bloqueur de publicités et de trackers qui intègre des fonctions supplémentaires telles que le DOH qui permet de chiffrer les requêtes DNS de votre réseau Wi-Fi !

## A quoi bon ?

Il est vrai que l'on pourrait se demander à quoi pourrait servir un tel outil... Laissez moi vous expliquer : quand vous possédez un appareil connecté à Internet (téléphone, tablette, ordinateur, etc.), des trackers espionnent votre activité afin de revendre des données à des annonceurs leur permettant ainsi de faire de la publicité ciblée. Ces données peuvent révéler beaucoup sur vous, tel que par exemple votre localisation, votre situation familiale, votre état de santé, etc. C'est pourquoi il est très important de se protéger de ces trackers. J'ai moi-meme installé ce logiciel et voici, en 24H le nombre de publicités et de trackers bloqués avec seulement 3 appareils connectés sur le même réseau :

![](https://i.postimg.cc/NjYnss13/Capture-d-cran-de-2020-05-09-15-48-28.png)

Comme vous voyez ci-dessus, en 24h, 5 230 requêtes ont été effectuées(puis bloquées) ! Dont 415 à destination des serveurs de Facebook et 604 à ceux de Google !

## Prérequis

Pour ce tutoriel, vous aurez besoin :

• D'un Raspberry Pi disposant d'un module WiFi  
• D'un câble RJ45 (Ethernet)

Et c'est tout !

## Tutoriel

Dans ce tutoriel nous allons donc voir l'installation de RaspAP qui permet de faire un point d'accès wifi à partir d'un cable Ethernet branché au Raspberry Pi puis nous verrons l'installation de AdGuard Home ainsi que l'activation de la compatibilité avec le DOH (DNS over HTTPS qui permet de chiffrer vos requetes DNS) et en bonus, l'installation et la mise en place d'un VPN respectueux de la vie privée de ses utilisateurs (ProtonVPN) sur tout le réseau de votre domicile.

**1) Installation de RaspAP**

Pour débuter l'installation de RaspAP, effectuez la commande suivante sur votre Raspberry Pi

> sudo apt update && sudo apt upgrade -y && wget -q [https://git.io/voEUQ](https://git.io/voEUQ) -O /tmp/raspap && bash /tmp/raspap

L'installateur va s'ouvrir, il vous demande d'abord dans quel répertoire vous souhaitez installer RaspAP à moins que vous ne souhaitez le changer, laissez le répertoire de base, répondre oui à tout (y) sauf au moment où il vous sera proposé d'installer le bloqueur de publicités, nous n'utiliserons pas celui intégré à RaspAP car il est moins performant que AdGuard Home.

![](https://i.postimg.cc/gkfgjY3z/raspap-02.png)

À la dernière étape, l'installateur vous demandera si vous souhaitez redémarrer le Raspberry Pi, répondez oui.  
Une fois votre Raspberry Pi redémarré, vous pourrez vous rendre sur l'interface web de votre Raspberry Pi, à noter que les identifiants de connexi sont "admin"/"secret". Pour y accéder, tapez juste l'adresse IP locale de votre Raspberry Pi dans votre navigateur, et depuis cette interface, vous pourrez change le SSID (nom du réseau), les informations de connexion, etc. Nous avons donc finit d'installer RaspAP, aucune configuration de ce dernier n'est nécessaire pour l'instant.

**2) Installation de AdGuard Home**

Pour commencer l'installation de AdGuard Home, entrez la commande suivante sur votre Raspberry Pi

> wget [https://static.adguard.com/adguardhome/release/AdGuardHome_linux_arm.tar.gz](https://static.adguard.com/adguardhome/release/AdGuardHome_linux_arm.tar.gz) && tar -xf AdGuardHome_linux_arm.tar.gz && cd AdGuardHome && sudo ./AdGuardHome -s install

Rendez-vous ensuite sur l'interface d'installation qui se situe à l'adresse.

`http://IPLOCALEDEMONRASPBERRYPI:3000`

Après avoir cliqué sur "C'est parti", dans la partie "Interface web administrateur", laissez "Toutes les interfaces" et changez le port pour, disons par exemple, 1234\. Dans la partie "Serveur DNS", choisissez 127.0.0.1 à la place de "Toutes les interfaces" et mettez 5300 dans la case port.

![](https://i.postimg.cc/cCDkJw06/ad-guard.png)

Cliquez sur le bouton Suivant puis renseignez vos informations de connexion à l'interface d'administration

![](https://i.postimg.cc/bYDjGw4W/Screenshot-2020-05-09-Setup-Ad-Guard-Home.png)

Une fois cela fait, cliquez sur Suivant puis "ouvrir le Tableau de bord", entrez vos identifiants de connexions puis allez dans la section Filtres puis Listes de blocage DNS. Cochez toutes les cases et ajoutez la liste :

`"https://raw.githubusercontent.com/hl2guide/Filterlist-for-AdGuard/master/filter_blocklist.txt"`

en cliquant sur la bouton Ajouter liste de blocage.

![](https://i.postimg.cc/fR6dNyns/Screenshot-2020-05-09-Ad-Guard-Home.png)

Pour finaliser l'installation, rendez-vous sur l'interface d'administration de RaspAP, les identifiants de connexion sont par défaut "admin"/"secret". Puis dans la section DHCP server, cliquez sur Advanced, puis cochez la case " Only ever query DNS servers configured below". Renseignez ensuite "127.0.0.1#5300" dans la case Add upstream DNS server, puis cliquez sur le bouton +

![](https://i.postimg.cc/8Pdk5C6D/Screenshot-2020-05-09-Rasp-AP-Wi-Fi-Configuration-Portal.png)

Pour finir, redémarrez le Point D'accès en cliquant sur le bouton Restart hotspot dans la section "Hotspot". Et voilà ! L'installation de RaspAP et de AdGuard Home est terminée !

**3) Bonus : Mise en place du DOH ainsi que d'un VPN**

Pour mettre en place le DOH, allez sur l'interface d'administration de AdGuard Home puis dans paramètres, paramètres DNS, renseignez le DOH de votre choix, dans mon cas, j'ai choisi

`https://doh.powerdns.org/`

![](https://i.postimg.cc/gJ5jvBzW/Screenshot-2020-05-09-Ad-Guard-Home-1.png)

Vos requêtes DNS sont maintenant chiffrées ! Pour mettre en place le VPN, connectez-vous en SSH à votre Raspberry Pi puis effectuez la commande :

> sudo apt install -y openvpn dialog python3-pip python3-setuptools && sudo pip3 install protonvpn-cli && sudo protonvpn init

Suivez l'installateur, à l'étape où vous devez choisir quel protocole utiliser, choisissez TCP, une fois l'installation terminée, entrez la commande

> sudo protonvpn c -f

## Conclusion

Et voilà ! C'est terminé, vous pouvez maintenant naviguer sur internet sans publicités ni trackeurs ! Veillez à bien modifier le mot de passe ainsi que le SSID de votre réseau wifi ! Vous n'avez plus qu'à connecter tout les appareils de votre maison au nouveau réseau Wi-Fi et ils seront protégés à leur tour ? Si vous avez des questions, n'hésitez pas à me contacter sur twitter @eban_non ou par mail ebandev@protonmail.com. Merci à Azgar de m'avoir aidé pour la relecture

</div>
