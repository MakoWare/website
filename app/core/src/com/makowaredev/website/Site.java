package com.makowaredev.website;

import com.makowaredev.website.Screens.HomeScreen;
import com.badlogic.gdx.Game;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class Site extends Game {

	// used by all screens
	public SpriteBatch batcher;

	@Override
	public void create () {
		batcher = new SpriteBatch();
		//Settings.load();
		//Assets.load();
		setScreen(new HomeScreen(this));
	}

	@Override
	public void render() {
		super.render();
	}

}
