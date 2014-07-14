package com.makowaredev.website.Screens;

import com.makowaredev.website.*;
import com.makowaredev.website.World.WorldListener;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.math.Vector3;

public class HomeScreen extends  ScreenAdapter {

    Site game;

	OrthographicCamera guiCam;
	Vector3 touchPoint;
	World world;
	WorldListener worldListener;
    WorldRenderer renderer;
    int lastScore;
	String scoreString;

    public HomeScreen (Site game){
        this.game = game;

        guiCam = new OrthographicCamera(320, 480);
        guiCam.position.set(320 / 2, 480 / 2, 0);
        touchPoint = new Vector3();

        worldListener = new WorldListener() {

        };

        world = new World(worldListener);
        renderer = new WorldRenderer(game.batcher, world);


    }

    public void update (float deltaTime) {

    }

    public void draw () {
        GL20 gl = Gdx.gl;
        gl.glClearColor(1, 0, 0, 1);
        gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        guiCam.update();
        game.batcher.setProjectionMatrix(guiCam.combined);


        game.batcher.enableBlending();
        game.batcher.begin();
        game.batcher.end();
    }

    @Override
    public void render (float delta) {
        update(delta);
        draw();
    }

    @Override
    public void pause () {

    }
}
