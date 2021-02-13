# Tests sur l'application

Le développement de cette application va se faire en mode TDD.

La stratégie de test est la suivante:

1) tester d'abord le rendu des différents composants, en l'occurence via une classe CSS unique pour chacun d'entre eux. On pourrait aussi utiliser un attribut HTML data-test mais ce n'est toujours recommandé de faire ainsi s'il faut supprimer celui-ci dans le code final. 

2) Tester les effets du state sur nos composants

3) Tester nos actions>