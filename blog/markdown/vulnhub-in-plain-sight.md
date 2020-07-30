<div class="header">
  <div class="nav"><a href="https://eban.dev/blog/">ACCUEIL</a><a href="https://eban.dev/blog/contact.html">CONTACT</a><a href="https://eban.dev/blog/about.html">A PROPOS</a></div>
  <h1>Eban's Blog</h1>
</div>
<div class="article-list">


# Vulnhub : In Plain Sight 📝

Pour ce second write-up, nous allons faire In Plain Sight qui est une box créée par bzyo.  
[Ici](https://www.vulnhub.com/entry/in-plain-sight-101,400/), le lien pour la télécharger

## ENUMERATION

Pour trouver l’IP de notre box, on lance la commande suivante

> netdiscover

![](https://i.postimg.cc/RVrS70vj/Capture-d-cran-de-2020-04-22-15-14-01.png)

On voit ici que nous avons notre cible en 192.168.1.40, on lance donc un scan nmap sur l’IP de notre box, pour cela on lance la commande

> nmap -A 192.168.1.40

![](https://i.postimg.cc/vZKxdsrM/Capture-d-cran-de-2020-04-22-15-16-53.png)

Nous avons donc, du SSH à jour et sans faille connue, idem pour le serveur HTTP, ainsi qu'un serveur ftp ouvert avec, d'après nmap un fichier todo.txt accessible en lecture, la connexion en anonyme est autorisée sur le serveur ftp.  
On s'empresse donc d'aller voir du coté du serveur ftp, pour s'y connecter en anonyme on utilise la commande

> ftp 192.168.1.40

On rentre donc anonymous en nom d'utilisateur et on ne met pas de mot de passe...

![](https://i.postimg.cc/8PfnQhf0/Capture-d-cran-de-2020-04-22-15-22-54.png)

On utilise ensuite la commande

> dir

Pour afficher les dossiers et fichiers présents dans le répertoire courant (équivalent à ls sous linux)

![](https://i.postimg.cc/vmBTqHcb/Capture-d-cran-de-2020-04-22-15-26-03.png)

Nous voyons donc qu'il y a un fichier todo.txt qui nous est accessible en lecture.  
On le récupère sur notre machine avec la commande

> get todo.txt

On peut ensuite lire le fichier et voilà ce qu'il contient

`mike - please get ride of that worthless wordpress instance! it's a security risk. if you have privilege issues, please ask joe for assitance. <br>joe - stop leaving backdoors on the system or your access will be removed! your rabiit holes aren't enough for these elite cyber hacking types. - boss person`

On comprend donc qu'il y a une instance wordpress vulnérable sur la machine cible ...  
On comprend aussi que l'utilisateur Joe a certains privileges sur notre machine cible.  
Regardons donc du côté du serveur web.

![](https://i.postimg.cc/SxyxR7Fg/Capture-d-cran-de-2020-04-22-15-36-57.png)

En regardant cette page, quelque chose m'intrigue, il est écrit

`located at /var/www/html/index.htnl`

Alors qu'il devrait etre écrit...

`located at /var/www/html/index.html`

Regardons donc ce fameux fichier index.htnl, et bingo ! On tombe sur une page contenant un gif cliquable qui renvoie vers un autre page

![](https://i.postimg.cc/T1TWxyxS/Capture-d-cran-de-2020-04-22-15-41-18.png)

Allons voir vers quelle page nous envoie ce lien...  
Il nous renvoie donc vers une page où l'on peut mettre en ligne une image mais, malheureusement, il est impossible de bypasser les protections pour upload un fichier php...  
Ne serions nous pas tombés dans une de ces fameuses fausses pistes dont parlait Joe au debut ? Pas si sûr... Regardons du côté du code source de la page !

![](https://i.postimg.cc/zvTDzhTN/Capture-d-cran-de-2020-04-22-15-51-31.png)

On voit donc en bas de la page, une chaine de caractère encodée en base 64

`c28tZGV2LXdvcmRwcmVzcw==`

On la décode donc avec la commande

> echo c28tZGV2LXdvcmRwcmVzcw== | base64 --decode

![](https://i.postimg.cc/sXz8b033/Capture-d-cran-de-2020-04-22-16-01-16.png)

Cela ressemble à une url de site wordpress... On nous avait dit plus haut qu'il y avait une instance wordpress vulnérable, ca peut être intéressant !  
Allons donc à l'adresse :

> [http://192.168.1.40/so-dev-wordpress](http://192.168.1.40/so-dev-wordpress)

Nous arrivons donc sur un site wordpress classique mais, le css ne semble pas s'être chargé...

En regardant dans le code source, on voit que le fichier css est censé être à l'url [http://inplainsight/so-dev-wordpress/wp-content-themes/twentytwenty/print.css](http://inplainsight/so-dev-wordpress/wp-content-themes/twentytwenty/print.css)

Il faut donc rajouter l'ip de la box au fichier hosts de notre machine. Pour en savoir plus, je vous conseille la très bonne vidéo de Processus Thief sur le fonctionnement des virtual hosts que vous pouvez retrouver [Ici](https://www.youtube.com/watch?v=uG_bRjqUzFM.)  
Nous effectuons donc la commande :

> nano /etc/hosts

On rajoute donc la ligne :

`192.168.1.40 inplainsight`

![](https://i.postimg.cc/BnKCp5Bf/Capture-d-cran-de-2020-04-23-11-43-11.png)

Retournons donc sur le site, et voilà ! Notre css est maintenant chargé

![](https://i.postimg.cc/G3jMZjDF/Capture-d-cran-de-2020-04-23-11-46-14.png)

D'après ce que l'on sait, ce wordpress est vulnérable, lancons donc wpscan avec rockyou comme liste de mot de passe et les utilisateurs admin, mike et joe avec la commande :

> wpscan --url [http://192.168.1.40/so-dev-wordpress/](http://192.168.1.40/so-dev-wordpress/) --passwords /usr/share/wordlists/rockyou.txt --usernames admin,mike,joe

![](https://i.postimg.cc/tgCh17N8/Sans-titre.png)

Et voila, nous avons trouvé un couple user/pass qui est

`admin/admin1`

Connectons nous à l'interface d'admin de wordpress

![](https://i.postimg.cc/gJKyrRC9/Capture-d-cran-de-2020-04-23-12-09-58.png)

Nous avons donc accès à la page d'administration de wordpress !

Il est possible d'envoyer un reverse shell avec wordpress. Pour ce faire, il faut modifier une des pages du theme wordpress, pour cet exemple nous allons modifier le fichier 404.php.  
Pour ce faire, allons dans la rubrique Appearance puis theme editor.

![](https://i.postimg.cc/qvVGGJYL/Capture-d-cran-de-2020-04-23-14-19-13.png)

Dans le panneau de droite, sélectionnez 404 Template

![](https://i.postimg.cc/3JMJkGrc/Capture-d-cran-de-2020-04-23-14-23-56.png)

Il ne reste plus qu'à ajouter au fichier 404.php un reverse shell en php trouvé dans les reverse shell intégrés à kali dans le répertoire.

`/usr/share/webshells/php/php-reverse-shell.php`

![](https://i.postimg.cc/zBdcM6pc/Capture-d-cran-de-2020-04-23-14-33-00.png)

On lance un listener netcat.  
On va donc ensuite sur la page 404.php que l'on vient de modifier. Voici le lien :

> [http://192.168.1.40/so-dev-wordpress/wp-content/themes/twentytwenty/404.php](http://192.168.1.40/so-dev-wordpress/wp-content/themes/twentytwenty/404.php)

On reçoit donc un shell dans notre terminal où nous avions lancé netcat !

![](https://i.postimg.cc/k5fp2GzH/Capture-d-cran-de-2020-04-23-14-52-32.png)

## EXPLOITATION & ELEVATION DE PRIVILEGE

Après avoir spawné un shell tty, on regarde si il y a quelque chose dans /home, on remarque que dans /home/joe, il y a un fichier "journal" qui ne nous est pas accessible en écriture...  
Dans le /home de mike, il n'y a rien. Allons donc voir du coté de la configuration de wordpress... Dans le dossier

> /var/www/html

Il y a un fichier wp-config, regardons ce que contient ce fichier

![](https://i.postimg.cc/X7z3JwpT/Capture-d-cran-de-2020-04-23-15-04-04.png)

On trouve donc des identifiants d'une base de données mysql... On essaye donc de se connecter à la base de données avec la commande :

> mysql -u sodevwp -p

On utilise comme mot de passe celui trouvé dans wp-config.php, une fois connecté, pour voir les bases de donnés présentes, on utilise la commande.

> show databases;

![](https://i.postimg.cc/C5fXmLyJ/Capture-d-cran-de-2020-04-23-15-22-48.png)

On voit ici qu'il y a une base de données nommée sodevwp, on utilise donc les commandes suivantes pour voir le contenu de la base de données sodevwp.

> use sodevwp;  
> show tables;

![](https://i.postimg.cc/bvPs69GF/Capture-d-cran-de-2020-04-23-15-27-14.png)

On regarde donc ce que contient la table sodevwp_users avec la commande :

> select * from sodevwp_users;

![](https://i.postimg.cc/BQ1tcnZ6/Capture-d-cran-de-2020-04-23-15-32-30.png)

Intéressant ! Nous avons donc le mot de passe hashé de l'utilisateur mike !  
Crackons le avec john sur notre machine en utilisant la commande :

> john --wordlist=/usr/share/wordlists/rockyou.txt mike_password.txt

![](https://i.postimg.cc/3wRCHry2/1-3-x-J8q-Zz-Ot1vg8-FXLXTH5-A.jpg)

Nous avons donc le mot de passe de mike !  
Essayons de nous connecter à l'utilisateur mike avec la commande :

> su mike

Et voila ! Nous avons un shell en tant que mike ! On spawn donc un shell tty.

![](https://i.postimg.cc/Z5WGHNZd/Capture-d-cran-de-2020-04-23-16-04-29.png)

Nous pouvons ensuite regarder le contenu de /etc et on remarque un fichier passwd-, étrange... En regardant le contenu de ce fichier, on remarque que le mot de passe de joe est en clair dans le fichier ! Essayons donc de nous connecter au compte de joe avec la commande :

> su joe

![](https://i.postimg.cc/cJBBnsCb/Capture-d-cran-de-2020-04-23-16-13-56.png)

En utilisant SmashMouthNoThanks comme mot de passe.  
On cherche donc si on peut trouver quelque chose d'intéressant... Et dans le dossier /sbin/, il y a executable nommé bwrap, quand on lance l'executable, on obtient un shell en tant que root..

![](https://i.postimg.cc/WbrZyf4s/Capture-d-cran-de-2020-04-23-16-38-55.png)

Et voilà, cette box est terminée ! Merci d'avoir lu ce write-up en entier ! Si vous avez des retours, n'hésitez pas à me contacter sur twitter @eban_non.

![](https://i.postimg.cc/wMkQSf6f/Capture-d-cran-de-2020-04-23-16-43-21.png)

</div>
