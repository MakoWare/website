package com.makowaredev.website.Screens;

import com.makowaredev.website.*;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.ScreenAdapter;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.OrthographicCamera;
import com.badlogic.gdx.math.Rectangle;
import com.badlogic.gdx.math.Vector3;

import com.badlogic.gdx.math.Vector2;
import com.badlogic.gdx.physics.box2d.Body;
import com.badlogic.gdx.physics.box2d.BodyDef;
import com.badlogic.gdx.physics.box2d.BodyDef.BodyType;
import com.badlogic.gdx.physics.box2d.Box2DDebugRenderer;
import com.badlogic.gdx.physics.box2d.CircleShape;
import com.badlogic.gdx.physics.box2d.Fixture;
import com.badlogic.gdx.physics.box2d.FixtureDef;
import com.badlogic.gdx.physics.box2d.PolygonShape;
import com.badlogic.gdx.physics.box2d.World;
import com.badlogic.gdx.utils.TimeUtils;

public class HomeScreen extends  ScreenAdapter {

    Site game;

    OrthographicCamera camera;
    World world;
    Box2DDebugRenderer debugRenderer;
    int ballcount;
    long lastBallSpawn;

    public HomeScreen(final Site game) {
        this.game = game;

        // init camera
        camera = new OrthographicCamera();
        camera.setToOrtho(false, 600, 480);

        // init debug renderer
        debugRenderer = new Box2DDebugRenderer();

        // init World
        world = new World(new Vector2(0, -40), true);

        // add a Ground body to the world
        generateGround();

        ballcount = 0;

    }

    private void generateGround(){
        //Ground body
        BodyDef groundBodyDef =new BodyDef();
        groundBodyDef.position.set(new Vector2(0, 10));
        Body groundBody = world.createBody(groundBodyDef);
        PolygonShape groundBox = new PolygonShape();
        groundBox.setAsBox((camera.viewportWidth) * 2, 10.0f);
        groundBody.createFixture(groundBox, 1.0f);
    }

    private void spawnBall(float x, float y){
        BodyDef bodyDef = new BodyDef();
        bodyDef.type = BodyType.DynamicBody;
        bodyDef.position.set(x, y);
        Body body = world.createBody(bodyDef);
        CircleShape dynamicCircle = new CircleShape();
        dynamicCircle.setRadius(10f);
        FixtureDef fixtureDef = new FixtureDef();
        fixtureDef.shape = dynamicCircle;
        fixtureDef.density = 1.0f;
        fixtureDef.friction = 0.0f;
        fixtureDef.restitution = 1.0f;
        body.createFixture(fixtureDef);
        ballcount++;
        lastBallSpawn = TimeUtils.nanoTime();
    }

    @Override
    public void render(float delta) {
        // clear the screen with a dark blue color. The
        // arguments to glClearColor are the red, green
        // blue and alpha component in the range [0,1]
        // of the color to be used to clear the screen.
        Gdx.gl.glClearColor(0, 0, 0.1f, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);

        // tell the camera to update its matrices.
        camera.update();

        debugRenderer.render(world, camera.combined);
        world.step(1/60f, 6, 2);

        // check if we need to create a new ball
        if (TimeUtils.nanoTime() - lastBallSpawn > 500000000 && ballcount < 13){
            float x = ballcount * 43 + 43;
            float y = 400;

            spawnBall(x, y);
        }

    }

    @Override
    public void resize(int width, int height) {
    }


    @Override
    public void show() {
        // When the screen is shown
    }

    @Override
    public void hide() {
    }

    @Override
    public void pause() {
    }

    @Override
    public void resume() {
    }

    @Override
    public void dispose() {

    }

}
