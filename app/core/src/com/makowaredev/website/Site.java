package com.makowaredev.website;

import com.makowaredev.website.Screens.HomeScreen;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class Site extends Game {

    //Sprite batcher shared by all Screens
    public SpriteBatch batcher;

    public void create () {
        //Settings.load();
        //Assets.load();

        batcher = new SpriteBatch();
        setScreen(new HomeScreen(this));
    }

    public void render() {
        super.render();
    }

    public void dispose() {
        batcher.dispose();
    }
}
