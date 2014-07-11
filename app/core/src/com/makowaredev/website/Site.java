package com.makowaredev.website;

import com.makowaredev.website.Screens.HomeScreen;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;


public class Site extends Game {
    public SpriteBatch batcher;

	@Override
	public void create () {
        batcher = new SpriteBatch();
        setScreen(new HomeScreen(this));
	}

	@Override
	public void render () {
        super.render();
    }
}
