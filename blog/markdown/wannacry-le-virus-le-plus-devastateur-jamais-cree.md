---
title: WannaCry, le virus le plus dévastateur jamais créé 👾
date: 12-08-2020
keywords: [wannacry, virus, malware, hacking, eban, ransomware]
description: En mai 2017, un virus informatique du nom de WannaCry fait son apparition, il a infecté quelques 300 000 ordinateurs dans plus de 150 pays ! Trois ans plus tard, revenons ensemble sur le ransomware le plus dévastateur jamais créé.
url: https://blog.eban.dev/misc/wannacry-le-virus-le-plus-devastateur-jamais-cree
image: https://images.unsplash.com/flagged/photo-1560854350-13c0b47a3180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1026&q=80
...

# WannaCry: le virus le plus dévastateur jamais créé 👾

En mai 2017, un virus informatique du nom de WannaCry fait son apparition, il a infecté quelques 300 000 ordinateurs dans plus de 150 pays ! Trois ans plus tard, revenons ensemble sur le ransomware le plus dévastateur jamais créé.

### La genèse du projet

Le 13 août 2016, un groupe de hackers dénommé **The Shadow Brokers** met en libre téléchargement sur Tumblr, GitHub et Pastebin de nombreux programmes d'espionnage et de piratage informatique de la NSA dont la faille de sécurité EternalBlue, cette dernière permettant une RCE (remote code execution) sur un machine distante à partir d'un partage SMBv1 (plus d'infos [ici](https://docs.microsoft.com/fr-fr/security-updates/SecurityBulletins/2017/ms17-010)).
Cette vulnérabilité a été utilisée par le malware WannaCry afin de se propager.

Ce virus aujourd'hui attribué a la Corée du Nord et plus particulièrement au groupe Lazarus par de nombreux acteurs tel que le conseiller à la sécurité intérieure des USA [Tom Bossert](https://www.washingtonpost.com/world/national-security/us-set-to-declare-north-korea-carried-out-massive-wannacry-cyber-attack/2017/12/18/509deb1c-e446-11e7-a65d-1ac0fd7f097e_story.html) ou le chercheur en cybersécurité Matthieu Suiche interrogé par [Envoyé Spécial](https://yewtu.be/watch?v=Mp3TH5PI6rc) aurait donc été créé dans un but lucratif.

### Fonctionnement du Ransomware

Comme vu plus haut, WannaCry se propage tout seul (c'est un virus auto-répliquant ou vers) grâce à la faille de sécurité EternalBlue. Une fois executé sur la machine, le logiciel se met à chiffrer tout les fichiers personnels de l'ordinateur avec la méthode de chiffrement AES-128 (Une paire de clés RSA est générée au lancement du programme, la clé privée était utilisée pour chiffrer les fichiers).
Après l'infection, une somme équivalente à 300€ (voir 600€ en fonction des cas) en Bitcoin est demandée pour déchiffrer les fichiers. Il n'existe aucune preuve du fait que les personnes derrière WannaCry sont en capacité de déchiffrer les fichiers.
En effet, il est impossible pour les pirates de relier une transaction à un ordinateur spécifique. Une fois lancé, le logiciel installe aussi Tor sur la machine et essaie de se connecter aux serveurs C2 ([Command and Control](https://www.wikiwand.com/en/Command_and_control)) suivants:

-   gx7ekbenv2riucmf.onion
-   57g7spgrzlojinas.onion
-   xxlvbrloxvriy2c5.onion
-   76jdd2ir2embyv47.onion
-   cwwnhwhlz52maqm7.onion

### Un Antidote ?

Un groupe de trois experts en sécurité informatique français ont créé logiciel nommé [Wanakiwi](https://github.com/gentilkiwi/wanakiwi).
Cet outil permet de déchiffrer les fichiers qui l'ont été par WannaCry.
WannaCry utilise [**CryptoAPI**](https://fr.wikipedia.org/wiki/Cryptographic_Application_Programming_Interface) (les fonctions cryptographiques de Windows) pour générer les clés de chiffrement, cependant ces fonctions inscrivent dans la RAM de l'ordinateur la clé privée en claire, WanaKiwi va donc aller chercher dans la RAM des traces de la clé privée utilisée pour chiffrer les données.

### Comment se prémunir de ce type d'attaques dans le futur ?

On ne le dira jamais assez, mais n'ouvrez jamais de pièces jointes venant d'un destinataire inconnu.
Mettez à jour régulièrement votre OS, Microsoft propose une fonction très intéressante dans leur suite de sécurité Windows Defender nommée **Dispositif d'accès contrôlé aux dossiers**.
Cet outil permet de contrôler l'accès aux fichiers systèmes de Windows et aux données personnelles des utilisateurs par des programmes, il fonctionne avec un système de withelist, chaque programme doit donc être autorisé manuellement pour pouvoir modifier ces fichiers (plus d'infos [ici](https://docs.microsoft.com/fr-fr/windows/security/threat-protection/microsoft-defender-atp/evaluate-controlled-folder-access)).

Merci d'avoir lu cet article, j'espère qu'il vous aura plu.
Je suis preneur de vos retours :)

### Remerciements

Merci à Shyla, xeway, 0xThxmxs, Shcanovishka, Sycorax, look, Ramle et Lancelot de m'avoir aidé pour la relecture

Sources :

- https://fr.wikipedia.org/wiki/WannaCry
- https://fr.wikipedia.org/wiki/The_Shadow_Brokers
- https://docs.microsoft.com/fr-fr/security-updates/SecurityBulletins/2017/ms17-010
- https://www.washingtonpost.com/world/national-security/us-set-to-declare-north-korea-carried-out-massive-wannacry-cyber-attack/2017/12/18/509deb1c-e446-11e7-a65d-1ac0fd7f097e_story.html
- https://yewtu.be/watch?v=Mp3TH5PI6rc
- https://www.secureworks.com/research/wcry-ransomware-analysis
- https://fr.wikipedia.org/wiki/Cryptographic_Application_Programming_Interface
- https://docs.microsoft.com/fr-fr/windows/security/threat-protection/microsoft-defender-atp/evaluate-controlled-folder-access 
