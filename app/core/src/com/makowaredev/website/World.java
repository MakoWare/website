package com.makowaredev.website;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.badlogic.gdx.math.Vector2;

public class World {
    public interface WorldListener {

        /*
        public void jump ();

        */
    }

    public static final float WORLD_WIDTH = 10;
    public static final float WORLD_HEIGHT = 15 * 20;
    public static final int WORLD_STATE_RUNNING = 0;
    public static final int WORLD_STATE_NEXT_LEVEL = 1;
    public static final int WORLD_STATE_GAME_OVER = 2;
    public static final Vector2 gravity = new Vector2(0, -12);

    public final List<Ball> blocks;

    public final WorldListener listener;

    public World (WorldListener listener) {
        this.blocks = new ArrayList<Ball>();
        this.listener = listener;

        generateLevel();
    }

    private void generateLevel () {

    }

    public void update (float deltaTime, float accelX) {
        updateBalls(deltaTime);

    }

    public void updateBalls(float deltaTime){


    }

}
