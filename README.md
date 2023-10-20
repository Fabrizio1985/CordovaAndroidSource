Cordova Android Shim 
===========

A shim to allow Cordova plugins written for android to be built without depending on the full
cordova or android distributions

How to use
---------

You can obtain the cordova android shim from maven central and to include your project use:

		<dependency>
			<groupId>org.exparity</groupId>
			<artifactId>cordova-android-shim</artifactId>
			<version>1.0.0</version>
			<scope>provided</scope>
		</dependency>

The scope must be provided to avoid bundling the shim with any deployed code

Source
------
The source is structured along the lines of the maven standard folder structure for a jar project.

  * Core classes [src/main/java]
  * Unit tests [src/test/java]

The source includes a pom.xml for building with Maven 

Acknowledgements
----------------
Developers:
  * Stewart Bissett
